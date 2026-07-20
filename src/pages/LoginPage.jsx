import studyIllustration from '../assets/study_illustration.png';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function LoginPage() {
  return (
    <>
      <style>{`
  :root{
    --blue-600:#2563eb;
    --blue-700:#1d4ed8;
    --purple-600:#7c3aed;
    --bg-soft:#eef2ff;
    --text-dark:#0f172a;
    --text-gray:#475569;
    --border:#e2e8f0;
    --radius-lg:20px;
    --radius-md:12px;
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{
    font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color:var(--text-dark);
    background:#fff;
  }
  a{text-decoration:none;color:inherit;}
  button{font-family:inherit;cursor:pointer;border:none;}

  /* NAVBAR */
  .navbar{
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:16px 48px;
    border-bottom:1px solid var(--border);
  }
  .navbar .brand{
    display:flex;
    align-items:center;
    gap:10px;
    font-size:1.3rem;
    font-weight:800;
  }
  .brand-logo{
    width:38px;height:38px;border-radius:10px;
    background:linear-gradient(135deg,var(--blue-600),var(--purple-600));
    display:flex;align-items:center;justify-content:center;
    color:#fff;font-size:1.1rem;
  }
  .brand .ai{color:var(--blue-600);}
  .navlinks{
    display:flex;gap:28px;align-items:center;
    font-size:0.95rem;font-weight:500;color:#334155;
  }
  .navlinks a.active{color:var(--blue-600);font-weight:600;}
  .navlinks a:hover{color:var(--blue-600);}
  .nav-right{display:flex;align-items:center;gap:14px;}
  .icon-btn{
    width:38px;height:38px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    background:#f1f5f9;font-size:1rem;
  }
  .btn{
    padding:10px 20px;border-radius:10px;font-weight:600;font-size:0.9rem;
  }
  .btn-outline{
    border:1.5px solid var(--blue-600);color:var(--blue-600);background:#fff;
  }
  .btn-gradient{
    background:linear-gradient(135deg,var(--blue-600),var(--purple-600));
    color:#fff;
  }

  /* HERO */
  .hero{
    display:grid;
    grid-template-columns:1.1fr 1fr;
    gap:40px;
    padding:56px 48px;
    background:linear-gradient(135deg,#f5f7ff 0%, #eef2ff 60%, #f3f0ff 100%);
    align-items:start;
  }
  .badge{
    display:inline-flex;align-items:center;gap:8px;
    background:#fff;border:1px solid var(--border);
    padding:8px 16px;border-radius:999px;
    font-size:0.85rem;font-weight:600;color:var(--blue-600);
    margin-bottom:20px;
  }
  .hero h1{
    font-size:2.7rem;line-height:1.15;font-weight:800;color:var(--text-dark);
  }
  .hero h1 .gradient{
    background:linear-gradient(135deg,var(--blue-600),var(--purple-600));
    -webkit-background-clip:text;background-clip:text;color:transparent;
    display:block;
  }
  .hero p.lead{
    margin-top:20px;font-size:1.05rem;color:var(--text-gray);max-width:520px;
  }
  .hero-ctas{
    display:flex;gap:14px;margin-top:28px;flex-wrap:wrap;
  }
  .btn-lg{padding:14px 24px;border-radius:12px;font-weight:700;font-size:0.95rem;}
  .btn-primary-lg{
    background:linear-gradient(135deg,var(--blue-600),var(--purple-600));
    color:#fff;display:flex;align-items:center;gap:8px;
    box-shadow:0 8px 20px rgba(37,99,235,0.25);
  }
  .btn-secondary-lg{
    background:#fff;border:1px solid var(--border);color:var(--text-dark);
    display:flex;align-items:center;gap:8px;
  }
  .btn-tertiary-lg{
    background:#eafaf0;color:#16a34a;
    display:flex;align-items:center;gap:8px;font-weight:700;
    padding:14px 24px;border-radius:12px;font-size:0.95rem;
  }

  .stats{
    display:grid;grid-template-columns:repeat(4,1fr);
    gap:12px;margin-top:34px;
    background:#fff;border:1px solid var(--border);
    border-radius:var(--radius-lg);padding:22px 18px;
    max-width:640px;
  }
  .stat{text-align:center;}
  .stat .num{font-size:1.4rem;font-weight:800;}
  .stat .label{font-size:0.78rem;color:var(--text-gray);margin-top:2px;}

  .illustration{
    margin-top:44px;position:relative;
    max-width:620px;
  }
  .illus-card{
    border-radius:24px;
    overflow:hidden;
  }
  .illus-card img{
    width:100%;height:auto;display:block;
    border-radius:24px;
  }

  /* LOGIN CARD */
  .login-card{
    background:#fff;border:1px solid var(--border);
    border-radius:var(--radius-lg);
    padding:36px 40px;
    box-shadow:0 20px 50px rgba(30,41,59,0.08);
  }
  .login-head{text-align:center;margin-bottom:26px;}
  .login-icon{
    width:64px;height:64px;border-radius:16px;
    background:linear-gradient(135deg,var(--blue-600),var(--purple-600));
    display:flex;align-items:center;justify-content:center;
    color:#fff;font-size:1.8rem;margin:0 auto 14px;
  }
  .login-head h2{font-size:1.5rem;font-weight:800;}
  .login-head p{color:var(--text-gray);font-size:0.9rem;margin-top:6px;}
  .login-head p .hl{color:var(--blue-600);font-weight:600;}

  .field{margin-bottom:18px;}
  .field label{
    display:block;font-size:0.85rem;font-weight:700;margin-bottom:6px;
  }
  .field .input-wrap{
    display:flex;align-items:center;gap:10px;
    border:1.5px solid var(--border);border-radius:10px;
    padding:12px 14px;
  }
  .field .input-wrap input{
    border:none;outline:none;flex:1;font-size:0.95rem;
  }
  .field .input-wrap .ic{color:#94a3b8;}

  .row-between{
    display:flex;align-items:center;justify-content:space-between;
    font-size:0.85rem;margin-bottom:20px;
  }
  .remember{display:flex;align-items:center;gap:8px;color:var(--text-gray);}
  .forgot{color:var(--blue-600);font-weight:600;}

  .btn-signin{
    width:100%;padding:14px;border-radius:12px;
    background:linear-gradient(135deg,var(--blue-600),var(--purple-600));
    color:#fff;font-weight:700;font-size:0.95rem;
    display:flex;align-items:center;justify-content:center;gap:8px;
    box-shadow:0 8px 20px rgba(37,99,235,0.25);
  }

  .divider{
    display:flex;align-items:center;gap:12px;color:#94a3b8;
    font-size:0.8rem;margin:22px 0;
  }
  .divider::before,.divider::after{
    content:"";flex:1;height:1px;background:var(--border);
  }

  .oauth-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .oauth-btn{
    display:flex;align-items:center;justify-content:center;gap:8px;
    border:1.5px solid var(--border);border-radius:10px;
    padding:12px;font-weight:600;font-size:0.9rem;background:#fff;
  }

  .curricula{margin-top:26px;text-align:center;}
  .curricula .lbl{font-size:0.75rem;color:#94a3b8;font-weight:700;letter-spacing:0.06em;margin-bottom:12px;}
  .pill-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}
  .pill{
    padding:6px 14px;border-radius:999px;font-size:0.78rem;font-weight:700;
  }
  .pill.tnpsc{background:#dbeafe;color:#1d4ed8;}
  .pill.upsc{background:#ede9fe;color:#6d28d9;}
  .pill.ssc{background:#d1fae5;color:#047857;}
  .pill.rrb{background:#ffedd5;color:#c2410c;}
  .pill.banking{background:#dbeafe;color:#1d4ed8;}
  .pill.police{background:#fee2e2;color:#b91c1c;}
  .pill.tet{background:#ccfbf1;color:#0f766e;}
  .pill.trb{background:#ede9fe;color:#6d28d9;}

  .signup-line{text-align:center;margin-top:24px;font-size:0.88rem;color:var(--text-gray);}
  .signup-line a{color:var(--blue-600);font-weight:700;}

  /* FEATURES STRIP */
  .features{
    display:grid;grid-template-columns:repeat(4,1fr);
    gap:0;border-top:1px solid var(--border);
  }
  .feature{
    display:flex;gap:14px;padding:28px 40px;
    border-right:1px solid var(--border);
  }
  .feature:last-child{border-right:none;}
  .feature .ficon{
    width:46px;height:46px;border-radius:12px;
    display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;
  }
  .ficon.blue{background:#dbeafe;color:#1d4ed8;}
  .ficon.purple{background:#ede9fe;color:#6d28d9;}
  .ficon.green{background:#d1fae5;color:#047857;}
  .ficon.orange{background:#ffedd5;color:#c2410c;}
  .feature h4{font-size:0.98rem;font-weight:800;margin-bottom:4px;}
  .feature p{font-size:0.85rem;color:var(--text-gray);}

  @media (max-width:1000px){
    .hero{grid-template-columns:1fr;padding:32px 24px;}
    .navbar{padding:14px 20px;}
    .navlinks{display:none;}
    .features{grid-template-columns:repeat(2,1fr);}
    .feature{border-right:none;border-bottom:1px solid var(--border);}
  }
  @media (max-width:560px){
    .stats{grid-template-columns:repeat(2,1fr);}
    .oauth-row{grid-template-columns:1fr;}
    .features{grid-template-columns:1fr;}
    .hero h1{font-size:2rem;}
  }
`}</style>

      <Navbar />

      <section className="hero">
        <div>
          <div className="badge">🛡️ Trusted by 5,00,000+ Aspirants</div>
          <h1>
            India's Most Trusted
            <span className="gradient">AI-Powered Platform</span>
            for Government Exams
          </h1>
          <p className="lead">
            Practice smarter, analyze performance, master every subject, and secure your dream government job.
          </p>
          <div className="hero-ctas">
            <Link to="/practice" className="btn-primary-lg">Start Learning Free →</Link>
            <Link to="/exams" className="btn-secondary-lg">📋 Explore Exam Catalog</Link>
            <Link to="/mock" className="btn-tertiary-lg">🚀 Free Mock Test ›</Link>
          </div>

          <div className="stats">
            <div className="stat"><div className="num">5,00,000+</div><div className="label">Happy Students</div></div>
            <div className="stat"><div className="num">120+</div><div className="label">Exams Covered</div></div>
            <div className="stat"><div className="num">25M+</div><div className="label">Questions Solved</div></div>
            <div className="stat"><div className="num">98%</div><div className="label">Success Rate</div></div>
          </div>

          <div className="illustration">
            <div className="illus-card">
              <img src={studyIllustration} alt="Student studying for government exams" />
            </div>
          </div>
        </div>

        <div>
          <div className="login-card">
            <div className="login-head">
              <div className="login-icon">🎓</div>
              <h2>Welcome Back</h2>
              <p>Continue your <span className="hl">Government Exam</span> Preparation Journey.</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label>Email Address</label>
                <div className="input-wrap">
                  <span className="ic">✉️</span>
                  <input type="email" placeholder="name@example.com" />
                </div>
              </div>

              <div className="field">
                <label>Password</label>
                <div className="input-wrap">
                  <span className="ic">🔒</span>
                  <input type="password" placeholder="••••••••" />
                  <span className="ic">👁️</span>
                </div>
              </div>

              <div className="row-between">
                <label className="remember">
                  <input type="checkbox" /> Remember Me
                </label>
                <a href="#" className="forgot">Forgot Password?</a>
              </div>

              <button className="btn-signin" type="submit">🔒 Sign In</button>
            </form>

            <div className="divider">OR</div>

            <div className="oauth-row">
              <button className="oauth-btn">🔴 Google</button>
              <button className="oauth-btn">🟦 Microsoft</button>
            </div>

            <div className="curricula">
              <div className="lbl">SUPPORTED EXAM CURRICULUMS</div>
              <div className="pill-row">
                <span className="pill tnpsc">TNPSC</span>
                <span className="pill upsc">UPSC</span>
                <span className="pill ssc">SSC</span>
                <span className="pill rrb">RRB</span>
                <span className="pill banking">Banking</span>
                <span className="pill police">Police</span>
                <span className="pill tet">TET</span>
                <span className="pill trb">TRB</span>
              </div>
            </div>

            <div className="signup-line">
              Don't have an account? <a href="#">Create Free Account</a>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <div className="ficon blue">🛡️</div>
          <div>
            <h4>100% Secure</h4>
            <p>Your data is safe and protected</p>
          </div>
        </div>
        <div className="feature">
          <div className="ficon purple">🎓</div>
          <div>
            <h4>Expert Curated</h4>
            <p>Quality content by exam experts</p>
          </div>
        </div>
        <div className="feature">
          <div className="ficon green">🤖</div>
          <div>
            <h4>AI-Powered</h4>
            <p>Smart analysis &amp; personalized insights</p>
          </div>
        </div>
        <div className="feature">
          <div className="ficon orange">🎧</div>
          <div>
            <h4>24/7 Support</h4>
            <p>We are here to help you anytime</p>
          </div>
        </div>
      </section>
    </>
  );
}
