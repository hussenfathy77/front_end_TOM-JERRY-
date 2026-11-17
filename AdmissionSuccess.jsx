import {
  Check, CheckCircle2, Hourglass, Clock, Info, ClipboardList, ArrowRight,
  Mail, Phone, Download, Bell, MapPin, Sparkles, Building2, Home
} from 'lucide-react';

const fmt = (iso, opts) => new Date(iso).toLocaleDateString('en-US', opts);
const SUPPORT_EMAIL = 'admissions@tomjerrynursery.com';

export default function AdmissionSuccess({ data, onStatus, onPortal }) {
  const submitted = fmt(data.submittedAt, { month: 'short', day: 'numeric', year: 'numeric' });
  const dob = data.dob ? fmt(`${data.dob}T00:00:00`, { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
  const group = (data.classGroup || '').replace('-', '–');

  return (
    <main className="ar-main sx-main">
      {/* Success hero */}
      <section className="sx-hero">
        <div className="sx-hero__icon"><Check size={26} /><Sparkles size={12} className="sx-hero__spark" /></div>
        <h1>Admission Request Submitted Successfully!</h1>
        <p>
          Thank you for applying to Tom &amp; Jerry Nursery. Your child's admission request has been
          received and is waiting for review by our nursery team.
        </p>
        <span className="sx-pill"><i /> Pending Review</span>
        <small>Our team will review your application and update its status when a decision is made.</small>
        <div className="sx-note">
          <Info size={13} />
          <span>Submission success confirms your request was safely received and does not imply final enrollment or immediate acceptance.</span>
        </div>
      </section>

      {/* Progress */}
      <section className="ar-card sx-card">
        <div className="sx-card__head">
          <h2>Application Progress</h2>
          <span className="sx-card__meta">STEP 2 OF 3 ACTIVE</span>
        </div>
        <div className="sx-steps">
          <div className="sx-step sx-step--done">
            <span className="sx-step__ic"><Check size={14} /></span>
            <div><b>Request Submitted</b><small>Completed • {submitted}</small><em>All necessary paperwork received.</em></div>
          </div>
          <div className="sx-step sx-step--current">
            <span className="sx-step__ic"><Hourglass size={14} /></span>
            <div><b>Under Review <u>CURRENT</u></b><small>In progress by Admissions</small><em>Assessing room availability.</em></div>
          </div>
          <div className="sx-step sx-step--next">
            <span className="sx-step__ic"><Clock size={14} /></span>
            <div><b>Decision Made</b><small>Upcoming Milestone</small><em>Written notification via portal &amp; email.</em></div>
          </div>
        </div>
      </section>

      <div className="sx-grid">
        {/* Summary */}
        <section className="ar-card sx-card">
          <div className="sx-card__head">
            <h2><ClipboardList size={16} /> Application Summary</h2>
            <span className="sx-ref">Reference ID: #{data.reference}</span>
          </div>
          <div className="sx-summary">
            <div className="sx-cell"><small>CHILD'S FULL LEGAL NAME</small><b>{data.childFullName}</b><span>Child DOB: {dob}</span></div>
            <div className="sx-cell"><small>PARENT / GUARDIAN</small><b>{data.parentFullName}</b><span>Primary Contact &amp; Billing</span></div>
            <div className="sx-cell"><small>REQUESTED PROGRAM / AGE GROUP</small><b>{group}</b><span>Full Day • 5 Days / Week</span></div>
            <div className="sx-cell"><small>DESIRED START TERM</small><b>{data.startTerm}</b><span>Submitted: {submitted}</span></div>
          </div>
          <div className="sx-foot-note"><Info size={12} /> Example details are shown above for formal submission verification and parent record keeping.</div>
          <div className="sx-actions">
            <button type="button" className="sx-btn sx-btn--primary" onClick={onStatus}>View Application Status <ArrowRight size={14} /></button>
            <button type="button" className="sx-btn sx-btn--ghost" onClick={onPortal}><Home size={14} /> Back to Parent Portal</button>
          </div>
        </section>

        {/* Office */}
        <aside className="ar-card sx-card sx-office">
          <h2><Building2 size={16} /> Admissions Office</h2>
          <p>Need assistance or have questions regarding your application? Our dedicated admissions coordinators are here to help guide you through each step of enrollment.</p>
          <div className="sx-contact"><Mail size={14} /><div><small>Email Assistance</small><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></div></div>
          <div className="sx-contact"><Phone size={14} /><div><small>Direct Line</small><b>+1 (555) 019-8230</b></div></div>
          <div className="sx-contact"><Clock size={14} /><div><small>Office Hours</small><b>Mon–Fri, 8:00 AM – 4:00 PM</b></div></div>
          <div className="sx-pdf"><span>PDF Receipt Generated</span><button type="button"><Download size={12} /> Download PDF</button></div>
        </aside>
      </div>

      {/* What happens next */}
      <div className="sx-trio">
        <div className="sx-mini"><span><Mail size={15} /></span><div><b>Confirmation Email</b><p>A detailed submission copy has been sent to your registered email address.</p></div></div>
        <div className="sx-mini sx-mini--peach"><span><MapPin size={15} /></span><div><b>Nursery Visit &amp; Tour</b><p>Our staff will coordinate an optional playdate tour once review completes.</p></div></div>
        <div className="sx-mini sx-mini--blue"><span><Bell size={15} /></span><div><b>Instant Updates</b><p>Track decision updates 24/7 directly from your parent dashboard.</p></div></div>
      </div>
    </main>
  );
}
