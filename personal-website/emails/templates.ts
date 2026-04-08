export function wrapEmailTemplate({
  title,
  intro,
  details,
  nextStep
}: {
  title: string;
  intro: string;
  details: string[];
  nextStep: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; background:#08111c; color:#f3ecdd; padding:32px;">
      <div style="max-width:640px; margin:0 auto; background:#101b2a; border:1px solid rgba(236,228,213,0.12); border-radius:24px; padding:32px;">
        <p style="letter-spacing:0.2em; text-transform:uppercase; font-size:12px; color:#c49c4a;">Office of Musa Allama</p>
        <h1 style="font-family: Georgia, serif; font-size:32px; margin-top:16px;">${title}</h1>
        <p style="line-height:1.8; color:#d0d6e1;">${intro}</p>
        <ul style="line-height:1.8; color:#d0d6e1;">
          ${details.map((detail) => `<li>${detail}</li>`).join("")}
        </ul>
        <p style="line-height:1.8; color:#d0d6e1;">${nextStep}</p>
      </div>
    </div>
  `;
}
