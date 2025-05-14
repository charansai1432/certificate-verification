import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import './CertificateGenerator.css';

const CertificateGenerator: React.FC = () => {
  const [name, setName] = useState('');
  const [program, setProgram] = useState('');
  const [duration, setDuration] = useState('');
  const [generated, setGenerated] = useState(false);
  const [idNo, setIdNo] = useState('');
  const [date, setDate] = useState('');
  const certRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    const generatedId = Math.floor(100000 + Math.random() * 900000).toString();
    const today = new Date().toLocaleDateString();
    setIdNo(generatedId);
    setDate(today);
    setGenerated(true);

    setTimeout(async () => {
      if (certRef.current) {
        certRef.current.style.width = '1000px';
        certRef.current.style.height = '700px';

        const canvas = await html2canvas(certRef.current, {
          scale: 2,
          width: certRef.current.scrollWidth,
          height: certRef.current.scrollHeight,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          unit: 'px',
          format: [canvas.width, canvas.height],
          orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${name.replace(/\s+/g, '_')}_certificate.pdf`);
      }
    }, 300);
  };

  return (
    <div className="certificate-wrapper">
      <div className="form-container">
        <h2>Enter Certificate Details</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="program">Internship Program</label>
          <input id="program" type="text" placeholder="e.g. Human Resources" value={program} onChange={e => setProgram(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input id="duration" type="text" placeholder="e.g. 12-Nov-2024 to 20-Mar-2025" value={duration} onChange={e => setDuration(e.target.value)} />
        </div>
        <button id="generate-btn" onClick={handleGenerate}>Preview & Download PDF</button>
      </div>

      {generated && (
        <div className="certificate-container" ref={certRef}>
          <div className="certificate-content">
            <div className="certificate-header">
              <img src="/assets/GreatHireLogo-preview.png" alt="Great Hire Logo" />
            </div>
            <h1 className="certificate-title">
              Certificate<br />
              <span className="certificate-subtitle">OF INTERNSHIP</span>
            </h1>
            <h6 className="certificate-company"><strong>Great Hire By Babde PVT LTD</strong></h6>
            <p className="description">This certificate is awarded to</p>
            <div className="recipient-name">{name}</div>
            <p className="description">
              In recognition of <br />
              His/Her successfully completing the 128‑days in <br />
              <strong>{program}</strong> Internship Program, showcasing exceptional<br />
              performance and dedication <br />
              conducted from <strong>{duration}</strong>.
            </p>
            <div className="date-number-section">
              <strong>ID Number:</strong> <span>{idNo}</span>
            </div>
            <div className="stamp-block">
              <img src="/assets/stamp.png" alt="Stamp" className="stamp-img" />
            </div>
            <div className="signature-section">
              <div className="date-block">
                <div className="date-value">{date}</div>
                <div className="signature-caption">Date</div>
              </div>
              <div className="sign-block">
                <img src="/assets/image.png" alt="Signature" className="signature-img" />
                <div className="sign-name">Sanket Babde<br />CEO / Founder</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;
