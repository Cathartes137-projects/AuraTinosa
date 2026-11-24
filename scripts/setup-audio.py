#!/usr/bin/env python3
"""
Prepara el audio del Módulo 6 en assets/audio/siseo-aura.mp3.

Prioridades:
  1. Descargar una grabación libre indicada con --url o AURA_AUDIO_URL.
  2. Generar localmente una reconstrucción bioacústica de siseo de advertencia.

La codificación MP3 utiliza lameenc. Si lameenc no está disponible, se conserva
el WAV generado y la etiqueta <audio> puede usarlo como alternativa.
"""

from __future__ import annotations

import argparse
import math
import os
import random
import struct
import sys
import urllib.request
import wave
from pathlib import Path


SAMPLE_RATE = 44_100
DURATION = 4.0
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "assets" / "audio"
MP3_PATH = OUTPUT_DIR / "siseo-aura.mp3"
WAV_PATH = OUTPUT_DIR / "siseo-aura.wav"
USER_AGENT = "AuraTinosaBot/1.0 (recurso educativo; +https://auratinosa.example.com)"


def biquad_bandpass(samples: list[float], center_hz: float, quality: float) -> list[float]:
    """Aplica un filtro paso banda recursivo de segundo orden."""
    omega = 2.0 * math.pi * center_hz / SAMPLE_RATE
    alpha = math.sin(omega) / (2.0 * quality)

    b0 = alpha
    b1 = 0.0
    b2 = -alpha
    a0 = 1.0 + alpha
    a1 = -2.0 * math.cos(omega)
    a2 = 1.0 - alpha

    b0, b1, b2 = b0 / a0, b1 / a0, b2 / a0
    a1, a2 = a1 / a0, a2 / a0

    x1 = x2 = y1 = y2 = 0.0
    output: list[float] = []

    for x0 in samples:
        y0 = b0 * x0 + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
        output.append(y0)
        x2, x1 = x1, x0
        y2, y1 = y1, y0

    return output


def envelope(seconds: int) -> list[float]:
    """Tres exhalaciones de advertencia, con ATAQUES y caídas suaves."""
    segments = [
        (0.10, 0.98, 0.62),
        (1.28, 1.76, 0.42),
        (2.05, 3.68, 0.90),
    ]
    values = [0.0] * seconds
    attack = int(0.09 * SAMPLE_RATE)
    release = int(0.16 * SAMPLE_RATE)

    for start_s, end_s, peak in segments:
        start = int(start_s * SAMPLE_RATE)
        end = min(seconds, int(end_s * SAMPLE_RATE))

        for index in range(start, end):
            position = index - start
            if attack and position < attack:
                gain = 0.5 - 0.5 * math.cos(math.pi * position / attack)
            elif release and end - index < release:
                gain = 0.5 - 0.5 * math.cos(math.pi * (end - index) / release)
            else:
                gain = 1.0

            # Respiración ligeramente irregular, típica de una emisión forzada.
            gain *= 0.87 + 0.13 * math.sin(2.0 * math.pi * 7.5 * index / SAMPLE_RATE)
            values[index] = max(values[index], peak * gain)

    return values


def synthesize_samples() -> list[float]:
    total = int(SAMPLE_RATE * DURATION)
    random.seed(20261123)

    raw_noise = [random.uniform(-1.0, 1.0) for _ in range(total)]
    hiss_low = biquad_bandpass(raw_noise, 2_250.0, 1.05)
    hiss_high = biquad_bandpass(raw_noise, 3_750.0, 1.20)
    hiss = [0.62 * a + 0.38 * b for a, b in zip(hiss_low, hiss_high)]

    level = envelope(total)
    samples: list[float] = []

    for index, noise_value in enumerate(hiss):
        breath_floor = 0.012 * noise_value if index % 370 else 0.0
        samples.append(noise_value * level[index] + breath_floor)

    peak = max(abs(value) for value in samples) or 1.0
    return [value * (0.64 / peak) for value in samples]


def write_wav(samples: list[float], destination: Path) -> None:
    pcm = struct.pack(
        f"<{len(samples)}h",
        *(max(-32_768, min(32_767, int(round(value * 32_767)))) for value in samples),
    )

    with wave.open(str(destination), "wb") as output:
        output.setnchannels(1)
        output.setsampwidth(2)
        output.setframerate(SAMPLE_RATE)
        output.writeframes(pcm)


def encode_mp3(samples: list[float], destination: Path) -> bool:
    try:
        import lameenc  # type: ignore
    except ImportError:
        return False

    pcm = struct.pack(
        f"<{len(samples)}h",
        *(max(-32_768, min(32_767, int(round(value * 32_767)))) for value in samples),
    )

    encoder = lameenc.Encoder()
    encoder.set_bit_rate(128)
    encoder.set_in_sample_rate(SAMPLE_RATE)
    encoder.set_channels(1)
    encoder.set_quality(2)

    destination.write_bytes(encoder.encode(pcm) + encoder.flush())
    return True


def looks_like_audio(data: bytes) -> bool:
    if len(data) < 4:
        return False
    return data.startswith((b"RIFF", b"ID3")) or (data[0] == 0xFF and (data[1] & 0xE0) == 0xE0)


def download(url: str, destination: Path) -> bool:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})

    try:
        with urllib.request.urlopen(request, timeout=45) as response:
            payload = response.read()
    except (OSError, ValueError) as error:
        print(f"Advertencia: no se pudo descargar la URL ({error}).", file=sys.stderr)
        return False

    if not looks_like_audio(payload):
        print("Advertencia: el recurso descargado no parece audio válido.", file=sys.stderr)
        return False

    destination.write_bytes(payload)

    # Si el recurso es WAV, se conserva como alternativa explícita en el HTML.
    if payload.startswith(b"RIFF"):
        (destination.parent / "siseo-aura.wav").write_bytes(payload)

    print(f"Audio descargado en {destination}")
    return True


def write_credit() -> None:
    credit = """# Créditos del recurso de audio

- Archivo: `assets/audio/siseo-aura.mp3`
- Tipo: reconstrucción bioacústica sintetizada localmente, inspirada en la
  observación documentada de que *Cathartes aura* carece de siringe y emite
  siseos y gruñidos de advertencia.
- Duración aproximada: 4 segundos.
- Uso: educativo, libre de derechos para este proyecto.
- Alternativa WAV generada: `assets/audio/siseo-aura.wav`.
- Generación: `python scripts/setup-audio.py`

> Si se sustituye por una grabación de Wikimedia Commons, actualizar este
> archivo con el autor, la licencia y el enlace al original.
"""
    (OUTPUT_DIR / "CREDITOS-AUDIO.md").write_text(credit, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Descarga o genera el siseo del Aura Tiñosa.")
    parser.add_argument("--url", default=os.getenv("AURA_AUDIO_URL", ""), help="URL directa de una grabación libre.")
    parser.add_argument("--force", action="store_true", help="Regenera los archivos aunque ya existan.")
    args = parser.parse_args()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    if args.url:
        if download(args.url, MP3_PATH):
            write_credit()
            return 0
        print("Se generará una muestra local como respaldo.", file=sys.stderr)

    if MP3_PATH.exists() and WAV_PATH.exists() and not args.force:
        print("El audio ya está configurado. Usa --force para regenerarlo.")
        return 0

    samples = synthesize_samples()
    write_wav(samples, WAV_PATH)
    encoded = encode_mp3(samples, MP3_PATH)

    if encoded:
        print(f"MP3 generado: {MP3_PATH}")
    else:
        print(
            "WAV generado, pero lameenc no está disponible para crear MP3.\n"
            "Instálalo con: python -m pip install lameenc",
            file=sys.stderr,
        )

    write_credit()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
