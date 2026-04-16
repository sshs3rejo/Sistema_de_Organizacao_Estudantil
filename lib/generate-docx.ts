import {
  Document,
  Paragraph,
  TextRun,
  AlignmentType,
  PageBreak,
  Header,
  Footer,
  ImageRun,
  TabStopType,
  TabStopPosition,
  convertMillimetersToTwip,
  BorderStyle,
  WidthType,
  Table,
  TableRow,
  TableCell,
  VerticalAlign,
} from "docx"
import { saveAs } from "file-saver"
import type { CoverData } from "@/types/cover"
import { workTypeLabels } from "@/types/cover"

// UniFacema brand colors
const UNIFACEMA_BLUE = "1E3A5F"
const UNIFACEMA_ORANGE = "E87722"

export async function generateDocx(data: CoverData, logoBase64?: string) {
  const pageMargin = {
    top: convertMillimetersToTwip(25),
    bottom: convertMillimetersToTwip(20),
    left: convertMillimetersToTwip(30),
    right: convertMillimetersToTwip(30),
  }

  // Fetch the timbre image
  let timbreBuffer: ArrayBuffer | null = null
  try {
    const response = await fetch("/assets/timbre.png")
    timbreBuffer = await response.arrayBuffer()
  } catch (error) {
    console.error("Could not load timbre image:", error)
  }

  const isTCC = data.workType === "tcc"

  // Create background image for every page (via Header)
  const backgroundParagraph = timbreBuffer 
    ? new Paragraph({
        children: [
          new ImageRun({
            data: timbreBuffer,
            transformation: {
              width: 794, // A4 Width in px at 96 DPI
              height: 1123, // A4 Height in px at 96 DPI
            },
            floating: {
              horizontalPosition: {
                offset: 0,
              },
              verticalPosition: {
                offset: 0,
              },
              behindDocument: true,
            },
          }),
        ],
      })
    : null

  // Create header with logo (if available)
  const headerChildren: Paragraph[] = []
  
  if (logoBase64) {
    headerChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new ImageRun({
            data: logoBase64,
            transformation: {
              width: 150,
              height: 60,
            },
            type: "png",
          }),
        ],
      })
    )
  }

  // Institution header
  headerChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({
          text: data.institutionName,
          bold: true,
          size: 28,
          font: "Times New Roman",
          color: UNIFACEMA_BLUE,
          allCaps: true,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: data.courseName,
          size: 24,
          font: "Times New Roman",
          allCaps: true,
        }),
      ],
    })
  )

  // Authors
  const authorParagraphs = data.authors.filter(Boolean).map(
    (author) =>
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: author,
            bold: true,
            size: 28,
            font: "Times New Roman",
            allCaps: true,
          }),
        ],
      })
  )

  // Title
  const titleParagraph = new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 1200, after: 200 },
    children: [
      new TextRun({
        text: data.title || "TÍTULO DO TRABALHO",
        bold: true,
        size: 32,
        font: "Times New Roman",
        allCaps: true,
      }),
    ],
  })

  // Subtitle (if exists)
  const subtitleParagraph = data.subtitle
    ? new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 1200 },
        children: [
          new TextRun({
            text: data.subtitle,
            size: 28,
            font: "Times New Roman",
          }),
        ],
      })
    : null

  // Description for title page
  const descriptionText = isTCC
    ? `Trabalho de Conclusão de Curso apresentado ao Curso de ${data.courseName} do ${data.institutionName}, como requisito parcial para obtenção do título de Tecnólogo em ${data.courseName.split(" ").slice(-2).join(" ")}.`
    : `${workTypeLabels[data.workType]} apresentado(a) à disciplina de ${data.discipline || "[Disciplina]"} do Curso de ${data.courseName} do ${data.institutionName}, como requisito parcial para obtenção de nota.`

  const descriptionParagraph = new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: {
      left: convertMillimetersToTwip(80),
    },
    spacing: { before: 800, after: 200 },
    children: [
      new TextRun({
        text: descriptionText,
        size: 24,
        font: "Times New Roman",
      }),
    ],
  })

  // Advisor/Professor
  const advisorParagraph = (data.advisor || data.professor)
    ? new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: {
          left: convertMillimetersToTwip(80),
        },
        spacing: { before: 200, after: 800 },
        children: [
          new TextRun({
            text: isTCC ? "Orientador(a): " : "Professor(a): ",
            bold: true,
            size: 24,
            font: "Times New Roman",
          }),
          new TextRun({
            text: isTCC ? data.advisor || "" : data.professor || "",
            size: 24,
            font: "Times New Roman",
          }),
          ...(isTCC && data.coadvisor
            ? [
                new TextRun({
                  text: "\nCoorientador(a): ",
                  bold: true,
                  size: 24,
                  font: "Times New Roman",
                  break: 1,
                }),
                new TextRun({
                  text: data.coadvisor,
                  size: 24,
                  font: "Times New Roman",
                }),
              ]
            : []),
        ],
      })
    : null

  // Footer - City and Year
  const footerParagraphs = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 1200 },
      children: [
        new TextRun({
          text: data.city,
          size: 28,
          font: "Times New Roman",
          allCaps: true,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: data.year,
          size: 28,
          font: "Times New Roman",
        }),
      ],
    }),
  ]

  // Create the document
  const doc = new Document({
    sections: [
      // Cover Page
      {
        headers: {
          default: backgroundParagraph ? new Header({
            children: [backgroundParagraph],
          }) : undefined,
        },
        properties: {
          page: {
            margin: pageMargin,
            size: {
              width: convertMillimetersToTwip(210),
              height: convertMillimetersToTwip(297),
            },
          },
        },
        children: [
          ...headerChildren,
          new Paragraph({ spacing: { before: 600 } }),
          ...authorParagraphs,
          titleParagraph,
          ...(subtitleParagraph ? [subtitleParagraph] : []),
          new Paragraph({ spacing: { before: 2400 } }),
          ...footerParagraphs,
          new Paragraph({
            children: [new PageBreak()],
          }),
          // Title Page
          ...headerChildren,
          new Paragraph({ spacing: { before: 600 } }),
          ...authorParagraphs,
          titleParagraph,
          ...(subtitleParagraph ? [subtitleParagraph] : []),
          descriptionParagraph,
          ...(advisorParagraph ? [advisorParagraph] : []),
          new Paragraph({ spacing: { before: 1200 } }),
          ...footerParagraphs,
        ],
      },
    ],
  })

  // Generate and save the document
  const { Packer } = await import("docx")
  const blob = await Packer.toBlob(doc)
  const titlePart = data.title || "Capa_Academica"
  const fileName = `${titlePart}.docx`
    .replace(/[^a-zA-Z0-9_.-]/g, "_")
    .replace(/_+/g, "_")
  
  saveAs(blob, fileName)
}
