import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RegistrationRecord } from '../types';
import { EVENT_DETAILS, COORDINATORS } from '../config/eventData';

/**
 * Generates and downloads a high-fidelity PDF ticket for the registered participant.
 * Follows the 'Earthy Terracotta & Ochre' aesthetic reminiscent of a physical invitation card.
 */
export async function generateTicketPDF(
  record: RegistrationRecord,
  element?: HTMLElement | null
): Promise<boolean> {
  const sanitizedName = record.fullName.replace(/[^a-zA-Z0-9]/g, '_') || 'Participant';
  const fileName = `ASMITA_2026_Invitation_Pass_${record.registrationId}_${sanitizedName}.pdf`;

  // Method 1: High-resolution DOM capture of the styled card
  if (element) {
    try {
      const canvas = await html2canvas(element, {
        scale: 3, // Crisp 300+ DPI equivalent
        useCORS: true,
        logging: false,
        backgroundColor: '#FAF6EE', // Earthy Warm Parchment
        windowWidth: element.scrollWidth,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Create PDF formatted to standard A5
      const orientation = imgWidth > imgHeight ? 'landscape' : 'portrait';
      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format: 'a5',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Card Margins & Aspect Ratio
      const margin = 8;
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;

      let renderWidth = maxWidth;
      let renderHeight = (imgHeight * maxWidth) / imgWidth;

      if (renderHeight > maxHeight) {
        renderHeight = maxHeight;
        renderWidth = (imgWidth * maxHeight) / imgHeight;
      }

      const x = (pageWidth - renderWidth) / 2;
      const y = (pageHeight - renderHeight) / 2;

      // Warm handloom paper envelope background tint (economical for printing)
      pdf.setFillColor(245, 238, 226); // #F5EEE2
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // Subtle outer brass border around the envelope page
      pdf.setDrawColor(192, 138, 50); // Golden Ochre #C08A32
      pdf.setLineWidth(0.4);
      pdf.rect(3, 3, pageWidth - 6, pageHeight - 6);

      pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight, undefined, 'FAST');
      pdf.save(fileName);
      return true;
    } catch (captureErr) {
      console.warn('DOM capture PDF failed, falling back to pure vector layout:', captureErr);
    }
  }

  // Method 2: Direct Vector PDF Generation (100% reliable fallback)
  try {
    generateVectorPDF(record, fileName);
    return true;
  } catch (err) {
    console.error('Vector PDF generation failed:', err);
    throw err;
  }
}

/**
 * Pure vector fallback ticket layout formatted as an authentic
 * Earthy Terracotta & Golden Ochre Indian Invitation Patrika.
 */
function generateVectorPDF(record: RegistrationRecord, fileName: string) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a5', // 148 x 210 mm
  });

  const pageWidth = 148;
  const pageHeight = 210;

  // 1. Hand-Pressed Warm Parchment Canvas Background
  pdf.setFillColor(250, 246, 238); // #FAF6EE
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // 2. Double Ornamental Border: Outer Terracotta, Inner Golden Ochre
  pdf.setDrawColor(142, 63, 44); // Terracotta #8E3F2C
  pdf.setLineWidth(1.4);
  pdf.rect(6, 6, pageWidth - 12, pageHeight - 12);

  pdf.setDrawColor(192, 138, 50); // Golden Ochre #C08A32
  pdf.setLineWidth(0.5);
  pdf.rect(8, 8, pageWidth - 16, pageHeight - 16);

  // Corner accents
  pdf.setFillColor(192, 138, 50);
  pdf.circle(9.5, 9.5, 1, 'F');
  pdf.circle(pageWidth - 9.5, 9.5, 1, 'F');
  pdf.circle(9.5, pageHeight - 9.5, 1, 'F');
  pdf.circle(pageWidth - 9.5, pageHeight - 9.5, 1, 'F');

  // 3. Cultural Invocation & Masthead
  pdf.setTextColor(142, 63, 44); // Terracotta
  pdf.setFont('times', 'italic');
  pdf.setFontSize(8.5);
  pdf.text('|| Sanskriti • Parampara • Asmita • Gaurav ||', pageWidth / 2, 15, { align: 'center' });

  pdf.setTextColor(168, 77, 52); // Earthy Clay
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  pdf.text('IEC COLLEGE OF ENGINEERING & TECHNOLOGY, GREATER NOIDA', pageWidth / 2, 20.5, { align: 'center' });

  // 4. Royal Event Title Cartouche (Terracotta Ribbon)
  pdf.setFillColor(142, 63, 44); // #8E3F2C
  pdf.roundedRect(12, 23.5, pageWidth - 24, 20, 2, 2, 'F');
  pdf.setDrawColor(192, 138, 50);
  pdf.setLineWidth(0.4);
  pdf.roundedRect(12, 23.5, pageWidth - 24, 20, 2, 2, 'D');

  pdf.setTextColor(250, 246, 238);
  pdf.setFont('times', 'bold');
  pdf.setFontSize(21);
  pdf.text('ASMITA', pageWidth / 2, 33, { align: 'center' });

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.5);
  pdf.setTextColor(244, 235, 212); // Warm Gold
  pdf.text('ETHNIC DAY 2026 • OFFICIAL CEREMONIAL PASS', pageWidth / 2, 39, { align: 'center' });

  // 5. Delegate Pass Number Stub Bar
  pdf.setFillColor(239, 227, 202); // #EFE3CA
  pdf.roundedRect(12, 46.5, pageWidth - 24, 11, 1.5, 1.5, 'F');
  pdf.setDrawColor(192, 138, 50);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(12, 46.5, pageWidth - 24, 11, 1.5, 1.5, 'D');

  pdf.setTextColor(142, 63, 44);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.text('STATUS: CONFIRMED DELEGATE', 18, 53.5);

  pdf.setFillColor(142, 63, 44);
  pdf.roundedRect(pageWidth - 58, 48.5, 42, 7, 1, 1, 'F');
  pdf.setTextColor(250, 246, 238);
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(9);
  pdf.text(record.registrationId, pageWidth - 37, 53.5, { align: 'center' });

  // 6. Delegate Profile Sanctuary Card
  const cardX = 12;
  const cardY = 60.5;
  const cardW = pageWidth - 24;
  const cardH = 68;

  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(192, 138, 50);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(cardX, cardY, cardW, cardH, 2, 2, 'FD');

  // Decorative inner line
  pdf.setDrawColor(240, 228, 208);
  pdf.rect(cardX + 2, cardY + 2, cardW - 4, cardH - 4);

  const rollOrStatus =
    record.year === '1st Year'
      ? 'Roll No. Pending (1st Year)'
      : record.studentId || 'Verified';

  const profileRows = [
    { label: 'INVITED ATTENDEE', val: record.fullName, bold: true, isName: true },
    { label: 'BRANCH & SECTION', val: `${record.branch || 'Engineering'} • ${record.section || 'Section A'}` },
    { label: 'YEAR & ROLL NUMBER', val: `${record.year || 'Student'} • ${rollOrStatus}` },
    { label: 'REGISTERED EMAIL', val: record.email || 'N/A' },
    { label: 'HERITAGE ATTIRE', val: record.attireCategory || 'Traditional Ethnic Ensemble', italic: true },
  ];

  let currentY = cardY + 8;
  profileRows.forEach((row, idx) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.setTextColor(168, 77, 52); // Terracotta Clay
    pdf.text(row.label + ':', cardX + 5, currentY);

    if (row.isName) {
      pdf.setFont('times', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(36, 23, 17);
      pdf.text(String(row.val), cardX + 46, currentY + 0.5);
    } else {
      pdf.setFont('helvetica', row.italic ? 'italic' : row.bold ? 'bold' : 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(row.italic ? 109 : 45, row.italic ? 44 : 30, row.italic ? 29 : 24);
      pdf.text(String(row.val), cardX + 46, currentY);
    }

    if (idx < profileRows.length - 1) {
      pdf.setDrawColor(238, 226, 210);
      pdf.setLineWidth(0.2);
      pdf.line(cardX + 5, currentY + 3.5, cardX + cardW - 5, currentY + 3.5);
    }
    currentY += 11.5;
  });

  // 7. Auspicious Schedule & Convocation Venue Cartouche
  const schedY = 131.5;
  pdf.setFillColor(244, 235, 212); // Warm Ochre Tint
  pdf.roundedRect(cardX, schedY, cardW, 21, 2, 2, 'F');
  pdf.setDrawColor(192, 138, 50);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(cardX, schedY, cardW, 21, 2, 2, 'D');

  // Left Column: Date & Time
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(142, 63, 44);
  pdf.text('DATE & TIME', cardX + 6, schedY + 6);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(36, 23, 17);
  pdf.text('16 SEPTEMBER 2026', cardX + 6, schedY + 11.5);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7);
  pdf.setTextColor(89, 57, 44);
  pdf.text('Wednesday • 10:00 AM IST onwards', cardX + 6, schedY + 16);

  // Divider
  pdf.setDrawColor(192, 138, 50);
  pdf.setLineWidth(0.2);
  pdf.line(cardX + 64, schedY + 3, cardX + 64, schedY + 18);

  // Right Column: Venue
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(142, 63, 44);
  pdf.text('CONVOCATION VENUE', cardX + 70, schedY + 6);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(36, 23, 17);
  pdf.text('SEMINAR HALL, F BLOCK', cardX + 70, schedY + 11.5);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7);
  pdf.setTextColor(89, 57, 44);
  pdf.text('IEC Main Campus, Knowledge Park I', cardX + 70, schedY + 16);

  // 8. Perforated Tear Line
  const perfY = 157;
  pdf.setDrawColor(142, 63, 44);
  pdf.setLineWidth(0.3);
  // Cutout notch simulation on edges
  pdf.setFillColor(250, 246, 238);
  for (let i = cardX; i < cardX + cardW; i += 3) {
    pdf.line(i, perfY, i + 1.5, perfY);
  }

  // 9. Verification Stub: Ceremonial Seal & Security Block
  const stubY = 162;

  // Wax Seal
  pdf.setDrawColor(192, 138, 50);
  pdf.setFillColor(142, 63, 44); // Terracotta Wax
  pdf.circle(26, stubY + 12, 10, 'FD');
  pdf.circle(26, stubY + 12, 8.5, 'D');

  pdf.setTextColor(250, 246, 238);
  pdf.setFont('times', 'bold');
  pdf.setFontSize(5.5);
  pdf.text('ASMITA', 26, stubY + 11, { align: 'center' });
  pdf.setFontSize(4.5);
  pdf.text('SEAL 2026', 26, stubY + 14, { align: 'center' });

  // Seal Authority text
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(142, 63, 44);
  pdf.text('AUTHENTICATED CEREMONIAL PASS', 41, stubY + 7.5);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(6.8);
  pdf.setTextColor(89, 57, 44);
  pdf.text('Spearheads Student Council • IECian Cultural Society Network', 41, stubY + 12);
  pdf.text('Strict Dress Code: Traditional / Cultural Ethnic Attire required', 41, stubY + 16);

  // Security QR glyph box
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(192, 138, 50);
  pdf.setLineWidth(0.3);
  pdf.rect(pageWidth - 36, stubY + 2, 22, 22, 'FD');
  pdf.setTextColor(142, 63, 44);
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(6);
  pdf.text('SCAN CIPHER', pageWidth - 25, stubY + 12, { align: 'center' });
  pdf.text(record.registrationId.slice(-6), pageWidth - 25, stubY + 16, { align: 'center' });

  // 10. Helpline & Footer Notes
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(6.5);
  pdf.setTextColor(115, 74, 56);
  pdf.text(
    `Coordinators: ${COORDINATORS[0].name} (${COORDINATORS[0].displayPhone}) | ${COORDINATORS[1].name} (${COORDINATORS[1].displayPhone})`,
    pageWidth / 2,
    195,
    { align: 'center' }
  );
  pdf.setFont('times', 'italic');
  pdf.setFontSize(6);
  pdf.setTextColor(142, 63, 44);
  pdf.text('Official Digital Entry Pass • IEC College of Engineering & Technology', pageWidth / 2, 199, { align: 'center' });

  pdf.save(fileName);
}

