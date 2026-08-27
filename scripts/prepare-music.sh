#!/usr/bin/env bash
# Готовит фоновый трек для пригласительного: обрезает фрагмент, выравнивает
# громкость (двухпроходный loudnorm), добавляет плавные вход/выход и жмёт в mp3.
#
#   ./scripts/prepare-music.sh ~/Downloads/track.mp3             # первые 90 секунд
#   ./scripts/prepare-music.sh ~/Downloads/track.mp3 0:12 75     # с 0:12, длиной 75 сек
#
set -euo pipefail

SRC=${1:?Укажите исходный файл: ./scripts/prepare-music.sh <файл> [начало] [длительность]}
START=${2:-0}
DURATION=${3:-90}
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/music/wedding.mp3"

FADE_IN=2.5
FADE_OUT=3.5
FADE_OUT_AT=$(python3 -c "print($DURATION - $FADE_OUT)")
TARGET_LUFS=-18   # тише обычного: музыка играет фоном, а не солирует

echo "Источник:  $SRC"
echo "Фрагмент:  c $START, $DURATION сек"
echo

# Проход 1 — замеряем реальную громкость фрагмента
echo "→ замеряю громкость…"
MEASURED=$(ffmpeg -hide_banner -nostats -ss "$START" -t "$DURATION" -i "$SRC" \
  -af "loudnorm=I=${TARGET_LUFS}:TP=-1.5:LRA=11:print_format=json" -f null - 2>&1 \
  | sed -n '/^{/,/^}/p')

eval "$(python3 - "$MEASURED" <<'PY'
import json, sys
m = json.loads(sys.argv[1])
for k in ('input_i', 'input_tp', 'input_lra', 'input_thresh', 'target_offset'):
    print(f'M_{k.upper()}={m[k]}')
PY
)"

# Проход 2 — нормализуем по замеру, затем фейды, затем кодирование
echo "→ нормализую и кодирую…"
ffmpeg -hide_banner -loglevel error -y \
  -ss "$START" -t "$DURATION" -i "$SRC" \
  -af "loudnorm=I=${TARGET_LUFS}:TP=-1.5:LRA=11:measured_I=${M_INPUT_I}:measured_TP=${M_INPUT_TP}:measured_LRA=${M_INPUT_LRA}:measured_thresh=${M_INPUT_THRESH}:offset=${M_TARGET_OFFSET}:linear=true,afade=t=in:st=0:d=${FADE_IN},afade=t=out:st=${FADE_OUT_AT}:d=${FADE_OUT}" \
  -codec:a libmp3lame -b:a 128k -ar 44100 -ac 2 \
  "$OUT"

SIZE=$(du -h "$OUT" | cut -f1)
LEN=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT" | cut -d. -f1)
echo
echo "Готово: public/music/wedding.mp3 — ${LEN} сек, ${SIZE// /}"
