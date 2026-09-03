type InquiryFormProps = {
  defaultInquiryType?: string;
  defaultMessage?: string;
  submitLabel?: string;
};

export function InquiryForm({ defaultInquiryType = "", defaultMessage = "", submitLabel = "Send Inquiry" }: InquiryFormProps = {}) {
  return (
    <form action="/api/inquiries" method="post" className="grid gap-3 md:grid-cols-2">
      <input className="field rounded-md" name="name" placeholder="Name" required />
      <input className="field rounded-md" name="email" placeholder="Email" required type="email" />
      <input className="field rounded-md" name="phone" placeholder="Phone" />
      <input className="field rounded-md" name="organization" placeholder="Organization" />
      <input className="field rounded-md" name="country" placeholder="Country" />
      <select className="field rounded-md" defaultValue={defaultInquiryType} name="inquiryType" required>
        <option value="">Inquiry type</option>
        <option>Book inquiry</option>
        <option>Course inquiry</option>
        <option>Consulting</option>
        <option>Speaking</option>
        <option>Agriculture</option>
        <option>Partnership</option>
        <option>Media</option>
        <option>Membership</option>
        <option>Website development</option>
        <option>Regulatory application facilitation</option>
        <option>ICT centre establishment</option>
        <option>Business plan and feasibility study</option>
        <option>Funding and investor proposal</option>
        <option>Company profile and capability statement</option>
        <option>Expression of interest and prequalification</option>
        <option>Technical and financial tender proposal</option>
      </select>
      <select className="field rounded-md" name="budgetRange">
        <option value="">Budget range optional</option>
        <option>Below N250,000</option>
        <option>N250,000 - N1,000,000</option>
        <option>N1,000,000 - N5,000,000</option>
        <option>Above N5,000,000</option>
      </select>
      <select className="field rounded-md" name="preferredContact">
        <option value="">Preferred contact method</option>
        <option>Email</option>
        <option>Phone</option>
        <option>WhatsApp</option>
        <option>Calendar call</option>
      </select>
      <textarea className="field min-h-40 rounded-md md:col-span-2" defaultValue={defaultMessage} name="message" placeholder="Message" required />
      <button
        className="rounded-md bg-deep px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-vellum transition hover:bg-navy md:col-span-2"
        data-conversion="send_inquiry"
        data-conversion-label={submitLabel}
        type="submit"
      >
        {submitLabel}
      </button>
    </form>
  );
}
