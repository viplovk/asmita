import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RegistrationRecord } from '../types';
import { EVENT_DETAILS, COORDINATORS } from '../config/eventData';

/**
 * Generates and downloads a high-fidelity PDF ticket for the registered participant.
 * Implements a primary high-resolution DOM snapshot and a robust vector fallback.
 */
export async function generateTicketPDF(
  record: RegistrationRecord,
  element?: HTMLElement | null
): Promise<boolean> {
  const sanitizedName = record.fullName.replace(/[^a-zA-Z0-9]/g, '_') || 'Participant';
  const fileName = `ASMITA_2026_Pass_${record.registrationId}_${sanitizedName}.pdf`;

  // Method 1: If DOM element is available, attempt high-res canvas capture into PDF
  if (element) {
    try {
      const canvas = await html2canvas(element, {
        scale: 3, // High DPI for crisp print quality
        useCORS: true,
        logging: false,
        backgroundColor: '#E8D7B8',
        windowWidth: element.scrollWidth,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Create PDF formatted to fit the ticket aspect ratio
      const orientation = imgWidth > imgHeight ? 'landscape' : 'portrait';
      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format: 'a5',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate centered aspect ratio with margin
      const margin = 10;
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

      // Background decorative tint
      pdf.setFillColor(36, 23, 17); // #241711
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight, undefined, 'FAST');
      pdf.save(fileName);
      return true;
    } catch (captureErr) {
      console.warn('DOM capture PDF failed, switching to vector generation fallback:', captureErr);
    }
  }

  // Method 2: Direct Vector PDF Generation (100% reliable, zero external dependencies)
  try {
    generateVectorPDF(record, fileName);
    return true;
  } catch (err) {
    console.error('Vector PDF generation failed:', err);
    throw err;
  }
}

/**
 * Pure vector fallback ticket layout
 */
function generateVectorPDF(record: RegistrationRecord, fileName: string) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a5', // 148 x 210 mm
  });

  const pageWidth = 148;
  const pageHeight = 210;

  // 1. Canvas Outer Background (Aged Parchment / Warm Ivory)
  pdf.setFillColor(243, 235, 221); // #F3EBDD
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // 2. Double Ornate Border
  pdf.setDrawColor(176, 138, 69); // Brass #B08A45
  pdf.setLineWidth(1.2);
  pdf.rect(7, 7, pageWidth - 14, pageHeight - 14);

  pdf.setDrawColor(142, 63, 44); // Terracotta #8E3F2C
  pdf.setLineWidth(0.4);
  pdf.rect(9, 9, pageWidth - 18, pageHeight - 18);

  // 3. Header Banner (Terracotta #8E3F2C)
  pdf.setFillColor(142, 63, 44);
  pdf.rect(9, 9, pageWidth - 18, 28, 'F');

  // Institution & Event
  pdf.setTextColor(243, 235, 221);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.5);
  pdf.text('IEC COLLEGE OF ENGINEERING & TECHNOLOGY, GREATER NOIDA', pageWidth / 2, 16, { align: 'center' });

  pdf.setFont('times', 'bold');
  pdf.setFontSize(18);
  pdf.text('ASMITA — ETHNIC DAY 2026', pageWidth / 2, 25, { align: 'center' });

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(232, 215, 184);
  pdf.text('A CELEBRATION OF CULTURE, TRADITION & IDENTITY', pageWidth / 2, 32, { align: 'center' });

  // 4. Pass Status Badge & Registration ID
  pdf.setFillColor(232, 215, 184); // #E8D7B8
  pdf.roundedRect(14, 42, pageWidth - 28, 14, 2, 2, 'F');
  pdf.setDrawColor(176, 138, 69);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(14, 42, pageWidth - 28, 14, 2, 2, 'D');

  pdf.setTextColor(142, 63, 44);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.text('OFFICIAL ENTRY PASS', 20, 50.5);

  pdf.setFillColor(142, 63, 44);
  pdf.roundedRect(pageWidth - 62, 45, 43, 8, 1.5, 1.5, 'F');
  pdf.setTextColor(243, 235, 221);
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(9.5);
  pdf.text(record.registrationId, pageWidth - 40.5, 50.5, { align: 'center' });

  // 5. Participant Profile Card
  const boxX = 14;
  const boxY = 61;
  const boxW = pageWidth - 28;
  const boxH = 68;

  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(216, 193, 154);
  pdf.setLineWidth(0.4);
  pdf.roundedRect(boxX, boxY, boxW, boxH, 2, 2, 'FD');

  const fields = [
    { label: 'ATTENDEE NAME', val: record.fullName, bold: true },
    { label: 'COLLEGE', val: record.college || 'IEC College of Engineering & Technology' },
    { label: 'DEPARTMENT / BRANCH', val: record.branch || 'Not Specified' },
    { label: 'ACADEMIC YEAR', val: record.year || 'Student' },
    { label: 'STUDENT / ROLL ID', val: record.studentId || 'N/A' },
    { label: 'ATTIRE CATEGORY', val: record.attireCategory || 'Traditional Ethnic' },
  ];

  let currentY = boxY + 9;
  fields.forEach((f, i) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(142, 63, 44);
    pdf.text(f.label + ':', boxX + 5, currentY);

    pdf.setFont('helvetica', f.bold ? 'bold' : 'normal');
    pdf.setFontSize(f.bold ? 9.5 : 8.5);
    pdf.setTextColor(36, 23, 17);
    pdf.text(String(f.val), boxX + 46, currentY);

    if (i < fields.length - 1) {
      pdf.setDrawColor(230, 220, 205);
      pdf.setLineWidth(0.2);
      pdf.line(boxX + 5, currentY + 2.5, boxX + boxW - 5, currentY + 2.5);
    }
    currentY += 9.5;
  });

  // 6. Event Details Box (Date, Venue, Reporting Time)
  const detailBoxY = 134;
  pdf.setFillColor(232, 215, 184);
  pdf.roundedRect(14, detailBoxY, pageWidth - 28, 22, 2, 2, 'F');
  pdf.setDrawColor(176, 138, 69);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(14, detailBoxY, pageWidth - 28, 22, 2, 2, 'D');

  // Left: Date
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(142, 63, 44);
  pdf.text('DATE & TIME', 20, detailBoxY + 6.5);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(36, 23, 17);
  pdf.text('16 SEPTEMBER 2026', 20, detailBoxY + 12);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.text('Wednesday • 10:00 AM onwards', 20, detailBoxY + 17);

  // Right: Venue
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(142, 63, 44);
  pdf.text('VENUE', 82, detailBoxY + 6.5);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(36, 23, 17);
  pdf.text('SEMINAR HALL, F BLOCK', 82, detailBoxY + 12);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.text('IEC College, Knowledge Park I', 82, detailBoxY + 17);

  // 7. Security Verification Seal & Decorative Stamp
  const footerY = 162;
  pdf.setDrawColor(176, 138, 69);
  pdf.setLineWidth(0.3);
  pdf.line(14, footerY, pageWidth - 14, footerY);

  // Verification Seal
  pdf.setDrawColor(142, 63, 44);
  pdf.setFillColor(248, 243, 235);
  pdf.circle(28, footerY + 14, 10, 'FD');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(6);
  pdf.setTextColor(142, 63, 44);
  pdf.text('ASMITA', 28, footerY + 13, { align: 'center' });
  pdf.text('VERIFIED', 28, footerY + 16, { align: 'center' });

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(142, 63, 44);
  pdf.text('STATUS: CONFIRMED PARTICIPANT', 44, footerY + 10);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7);
  pdf.setTextColor(60, 45, 35);
  pdf.text('Presented by Spearheads Student Council', 44, footerY + 14.5);
  pdf.text('Please present this pass upon arrival at the F Block reception.', 44, footerY + 19);

  // 8. Bottom Coordinator Helpline & Pass Validity
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(6.5);
  pdf.setTextColor(120, 100, 85);
  pdf.text(
    `Coordinators: ${COORDINATORS[0].name} (${COORDINATORS[0].displayPhone}) | ${COORDINATORS[1].name} (${COORDINATORS[1].displayPhone})`,
    pageWidth / 2,
    196,
    { align: 'center' }
  );
  pdf.text('Official Digital Pass • Valid for ASMITA 2026 Admissions', pageWidth / 2, 200, { align: 'center' });

  pdf.save(fileName);
}
