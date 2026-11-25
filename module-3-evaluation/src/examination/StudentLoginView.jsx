import React, { useState } from 'react';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Input, Badge } from '../components/common/FormElements.jsx';
import { setStudentSession } from '../utils/storage.js';

/**
 * Student Login View Component
 *
 * Implements Prompt 8 Requirements:
 * 1. Login Interface: Application name, student login heading, Reg. Number, Password, Sign-in button.
 * 2. Demonstration Credentials: STU001 / student123.
 * 3. Client-Side Login Logic: Input validation, error states, and session persistence in LocalStorage.
 * 4. Security & Transparency: Explicit notice explaining client-side demo auth without backend servers.
 * 5. Password visibility toggle & quick-fill helper for evaluators.
 */
export function StudentLoginView({ onLoginSuccess, onSwitchToAdmin }) {
  const [regNumber, setRegNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Demo Student Credentials specified in Prompt 8
  const DEMO_REG_NUMBER = 'STU001';
  const DEMO_PASSWORD = 'student123';

  // Quick auto-fill helper for testing/evaluators
  const handleAutoFill = () => {
    setRegNumber(DEMO_REG_NUMBER);
    setPassword(DEMO_PASSWORD);
    setErrors({});
    setAuthError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const newErrors = {};

    const cleanReg = regNumber.trim().toUpperCase();
    const cleanPass = password.trim();

    // 1. Validation
    if (!cleanReg) {
      newErrors.regNumber = 'Registration Number is required.';
    }
    if (!cleanPass) {
      newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // 2. Validate against Demo Credentials
    setTimeout(() => {
      // Allow STU001 / student123 (or alias 22CSE101)
      if (
        (cleanReg === DEMO_REG_NUMBER && cleanPass === DEMO_PASSWORD) ||
        (cleanReg === '22CSE101' && cleanPass === 'student123')
      ) {
        // Construct verified student session object (passwords NOT stored in session)
        const sessionPayload = {
          registrationNumber: cleanReg,
          name: cleanReg === 'STU001' ? 'Gagan Kumar Reddy' : 'Gagan Kumar Reddy',
          rollNumber: '22CSE101',
          department: 'Computer Science & Engineering',
          semester: '6th Semester',
          batch: '2022-2026',
          email: 'gagan.reddy@eduexam.ac.in',
          role: 'student',
          loginTimestamp: new Date().toISOString()
        };

        // Persist session to LocalStorage
        setStudentSession(sessionPayload);
        setIsLoading(false);

        // Notify parent application
        if (onLoginSuccess) {
          onLoginSuccess(sessionPayload);
        }
      } else {
        setIsLoading(false);
        setAuthError(
          `Invalid credentials. Please use Registration Number: "${DEMO_REG_NUMBER}" and Password: "${DEMO_PASSWORD}".`
        );
      }
    }, 200);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        padding: '1.5rem',
        backgroundColor: 'var(--bg-body)'
      }}
    >
      <div style={{ width: '100%', maxWidth: '460px' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--navy-primary) 0%, var(--cyan-600) 100%)',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
              marginBottom: '0.75rem'
            }}
          >
            🎓
          </div>
          <h1
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: 'var(--navy-900)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            EduExam<span style={{ color: 'var(--cyan-600)' }}>Pro</span>
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            B.Tech Computer Science & Engineering Examination Portal
          </p>
        </div>

        {/* Login Card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Badge variant="cyan">CANDIDATE ACCESS</Badge>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Session Verification</span>
            </div>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--navy-900)',
                letterSpacing: '-0.01em'
              }}
            >
              Student Portal Login
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Enter your student credentials to view enrolled examinations and attempt online tests.
            </p>
          </div>

          {/* Demonstration Credentials Helper Box */}
          <div
            style={{
              backgroundColor: 'var(--cyan-light)',
              border: '1px solid var(--cyan-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1rem',
              fontSize: '0.8rem',
              color: 'var(--cyan-700)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700 }}>💡 Demo Credentials:</span>
              <button
                type="button"
                onClick={handleAutoFill}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--navy-primary)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Auto-fill
              </button>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.775rem' }}>
              <span>Reg: <code>STU001</code></span>
              <span>•</span>
              <span>Password: <code>student123</code></span>
            </div>
          </div>

          {/* Authentication Error Banner */}
          {authError && (
            <div
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--status-danger-bg)',
                border: '1px solid #fecaca',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--status-danger)',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>⚠️</span>
              <span>{authError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input
              label="Registration Number"
              required
              placeholder="e.g. STU001"
              value={regNumber}
              onChange={(e) => {
                setRegNumber(e.target.value);
                if (errors.regNumber) setErrors({ ...errors, regNumber: '' });
              }}
              error={errors.regNumber}
              prefix="👤"
              autoFocus
            />

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--navy-800)' }}>
                  Password <span style={{ color: 'var(--status-danger)' }}>*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--cyan-700)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? '🙈 Hide' : '👁️ Show'}
                </button>
              </div>

              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    color: 'var(--text-muted)',
                    pointerEvents: 'none',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  🔒
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your student password..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem 0.5rem 2.2rem',
                    fontSize: '0.875rem',
                    color: 'var(--text-main)',
                    backgroundColor: 'var(--bg-surface)',
                    border: errors.password ? '1px solid var(--status-danger)' : '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                    fontFamily: showPassword ? 'inherit' : 'sans-serif'
                  }}
                />
              </div>
              {errors.password && (
                <span style={{ fontSize: '0.75rem', color: 'var(--status-danger)', marginTop: '0.25rem', display: 'block' }}>
                  {errors.password}
                </span>
              )}
            </div>

            <Button
              type="submit"
              variant="cyan"
              size="lg"
              fullWidth
              disabled={isLoading}
              icon={isLoading ? '⏳' : '🔑'}
              style={{ marginTop: '0.5rem' }}
            >
              {isLoading ? 'Verifying Session...' : 'Sign In to Candidate Portal'}
            </Button>
          </form>

          {/* Academic Architecture Notice */}
          <div
            style={{
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.725rem',
              color: 'var(--text-muted)',
              lineHeight: 1.4,
              textAlign: 'center'
            }}
          >
            🔒 <strong>Client-Side Demonstration Mode:</strong> Student authentication and session state are managed
            purely in browser LocalStorage without backend servers, in strict adherence to capstone constraints.
          </div>

          {/* Switch to Admin helper */}
          {onSwitchToAdmin && (
            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={onSwitchToAdmin}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--navy-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Switch to Administrator Portal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentLoginView;

