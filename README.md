# PDF_PPTX_etc

Herramientas para manipular archivos PDF, PPTX y otros formatos de documentos.

## Descripcion

Este proyecto proporciona utilidades para:
- Convertir entre formatos de documentos
- Extraer texto de archivos PDF
- Manipular presentaciones PPTX
- Procesar otros formatos de oficina

## Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/PDF_PPTX_etc-1.git
cd PDF_PPTX_etc-1

# Instalar dependencias
pip install -r requirements.txt
```

## Ejemplo de uso

```python
from pdf_utils import extract_text

# Extraer texto de un PDF
texto = extract_text("documento.pdf")
print(texto)

# Convertir PDF a texto plano
with open("salida.txt", "w", encoding="utf-8") as f:
    f.write(texto)
```

## Estructura del proyecto

```
PDF_PPTX_etc-1/
├── README.md
├── requirements.txt
├── src/
│   ├── pdf_utils.py
│   └── pptx_utils.py
└── examples/
    └── ejemplo_basico.py
```

## Licencia

MIT License
