import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Table } from '../components/common/Table.jsx';
import { Badge } from '../components/common/FormElements.jsx';
import { INITIAL_RESULTS } from '../data/seedData.js';
import { getStoredResults } from '../utils/storage.js';

/**
 * Student Results View
 * Evaluation scorecard breakdown, grade assignment, and percentile feedback.
 * Reads directly from LocalStorage so newly completed exams display in real-time.
 */
export function StudentResultsView({ highlightResult = null, onNavigate }) {
  const [resultsList, setResultsList] = useState(() => {
    const stored = getStoredResults();
    return stored && stored.length > 0 ? stored : INITIAL_RESULTS;
  });

  const [selectedResult, setSelectedResult] = useState(() => {
    if (highlightResult) return highlightResult;
    const stored = getStoredResults();
    return stored && stored.length > 0 ? stored[0] : INITIAL_RESULTS[0];
  });

  useEffect(() => {
    const stored = getStoredResults();
    const list = stored && stored.length > 0 ? stored : INITIAL_RESULTS;
    setResultsList(list);
    if (highlightResult) {
      setSelectedResult(highlightResult);
    } else if (!selectedResult && list.length > 0) {
      setSelectedResult(list[0]);
    }
  }, [highlightResult]);

  const resultColumns = [
    {
      key: 'examCode',
      label: 'Course',
      width: '100px',
      render: (val) => <span style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{val}</span>
    },
    {
      key: 'examTitle',
      label: 'Exam Title'
    },
    {
      key: 'studentName',
      label: 'Candidate',
      render: (val, row) => `${val} (${row.studentRoll})`
    },
    {
      key: 'marksScored',
      label: 'Score Obtained',
      width: '140px',
      render: (val, row) => (
        <span style={{ fontWeight: 700, color: 'var(--navy-900)' }}>
          {val} / {row.totalMarks}
        </span>
      )
    },
    {
      key: 'percentage',
      label: 'Percentage',
      width: '110px',
      render: (val) => <span style={{ fontWeight: 600 }}>{val}%</span>
    },
    {
      key: 'passed',
      label: 'Evaluation',
      width: '120px',
      render: (val) => (
        <Badge variant={val ? 'success' : 'danger'}>
          {val ? 'PASSED' : 'NEEDS RE-EVAL'}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Scorecard',
      width: '120px',
      align: 'right',
      render: (_, row) => (
        <Button
          variant={selectedResult?.id === row.id ? 'cyan' : 'secondary'}
          size="sm"
          onClick={() => setSelectedResult(row)}
        >
          {selectedResult?.id === row.id ? 'Viewing' : 'Inspect'}
        </Button>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-900)' }}>
            Candidate Results & Performance Analytics
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Institutional scorecards with automated client-side grading, negative penalty audit, and question accuracy breakdown.
          </p>
        </div>

        {onNavigate && (
          <Button
            variant="secondary"
            size="sm"
            icon="⬅️"
            onClick={() => onNavigate('student_dashboard')}
          >
            Dashboard
          </Button>
        )}
      </div>

      {/* Featured Selected Scorecard */}
      {selectedResult && (
        <Card
          title={`Official Academic Scorecard • ${selectedResult.examTitle}`}
          subtitle={`Candidate: ${selectedResult.studentName} (Roll: ${selectedResult.studentRoll}) • Submission ID: ${selectedResult.id}`}
          badge={
            <Badge variant={selectedResult.passed ? 'success' : 'danger'}>
              {selectedResult.passed ? 'QUALIFIED / PASSED' : 'FAILED'}
            </Badge>
          }
          style={{ borderTop: `4px solid ${selectedResult.passed ? 'var(--status-success)' : 'var(--status-danger)'}` }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ backgroundColor: 'var(--bg-body)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Score Obtained</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                {selectedResult.marksScored} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ {selectedResult.totalMarks}</span>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-body)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Percentage</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--cyan-700)' }}>
                {selectedResult.percentage}%
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-body)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Correct vs Wrong</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--status-success)' }}>
                {selectedResult.correctCount} Correct{' '}
                <span style={{ fontSize: '0.9rem', color: 'var(--status-danger)' }}>({selectedResult.wrongCount || 0} Wrong)</span>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-body)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Time Elapsed</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                ⏱️ {Math.floor((selectedResult.timeTakenSeconds || 0) / 60)}m {(selectedResult.timeTakenSeconds || 0) % 60}s
              </div>
            </div>
          </div>

          {/* Submission Audit Details */}
          <div
            style={{
              marginTop: '1rem',
              padding: '0.85rem',
              backgroundColor: 'var(--bg-body)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              color: 'var(--navy-800)',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}
          >
            <div>
              <span>Submitted: <strong>{new Date(selectedResult.submittedAt).toLocaleString()}</strong></span>
            </div>
            <div>
              <span>Attempted Questions: <strong>{selectedResult.attempted} of {selectedResult.totalQuestions}</strong></span>
            </div>
            <div>
              <span>Focus Violations: <strong>{selectedResult.blurViolations || 0}</strong></span>
            </div>
          </div>
        </Card>
      )}

      {/* Results History Table */}
      <Card
        title="Official Examination Transcript"
        subtitle="All evaluated semester assessments recorded in browser LocalStorage"
      >
        <Table
          columns={resultColumns}
          data={resultsList}
          emptyMessage="No examination results available yet."
        />
      </Card>
    </div>
  );
}

export default StudentResultsView;
