import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {/* Example data cards */}
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
          <p className="text-center text-sm font-medium text-muted-foreground">
            Metric 1: 123
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
          <p className="text-center text-sm font-medium text-muted-foreground">
            Metric 2: 456
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
          <p className="text-center text-sm font-medium text-muted-foreground">
            Metric 3: 789
          </p>
        </div>
      </div>
      {/* Detailed section */}
      <div className="mt-6 min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        <h2 className="text-xl font-semibold mb-2">Detailed View</h2>
        <p className="text-sm text-muted-foreground">
          This section contains detailed information or charts. Replace this
          text with your desired content.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
