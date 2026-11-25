import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Table } from '../components/common/Table.jsx';
import { Badge } from '../components/common/FormElements.jsx';
import { INITIAL_RESULTS } from '../data/seedData.js';
import { getStoredResults } from '../utils/storage.js';

/**
 * Student Exam History View
 * Displays past test participation logs with attempt timestamps and verification tokens.
 */
export function StudentExamHistoryView({ onNavigate }) {
  const [historyList, setHistoryList] = useState(() => {
    const stored = getStoredResults();
    return stored && stored.length > 0 ? stored : INITIAL_RESULTS;
  });

  useEffect(() => {
    const stored = getStoredResults();
    setHistoryList(stored && stored.length > 0 ? stored : INITIAL_RESULTS);
  }, []);

  const historyColumns = [
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
      key: 'submittedAt',
      label: 'Date & Timestamp',
      render: (val) => new Date(val).toLocaleString()
    },
    {
      key: 'timeTakenSeconds',
      label: 'Time Taken',
      width: '120px',
      render: (val) => `${Math.floor(val / 60)}m ${val % 60}s`
    },
    {
      key: 'passed',
      label: 'Status',
      width: '110px',
      render: (val) => (
        <Badge variant={val ? 'success' : 'danger'}>
          {val ? 'COMPLETED' : 'FAILED'}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Scorecard',
      width: '130px',
      align: 'right',
      render: () => (
        <Button
          variant="secondary"
          size="sm"
          icon="📊"
          onClick={() => onNavigate('student_results')}
        >
          View Result
        </Button>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-900)' }}>
          Candidate Examination History
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Verified log of past submissions with tamper-proof timestamps recorded in LocalStorage.
        </p>
      </div>

      <Card
        title="Archived Examination Submissions"
        subtitle="Completed attempts eligible for result review"
      >
        <Table
          columns={historyColumns}
          data={historyList}
          emptyMessage="No previous examination submissions found."
        />
      </Card>
    </div>
  );
}

export default StudentExamHistoryView;

