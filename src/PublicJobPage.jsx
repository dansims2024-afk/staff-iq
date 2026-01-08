import React, { useEffect } from 'react';

const PublicJobPage = () => {
  // 1. The Job Data (In a real app, this comes from your database)
  const job = {
    title: "Store Manager",
    company: "Global Retail Corp",
    location: "Plainsboro, NJ",
    description: "We are seeking an experienced Store Manager to oversee daily operations, manage a team of 15+, and drive sales growth...",
    salaryMin: 65000,
    salaryMax: 85000,
    datePosted: "2026-01-08", // Today's date
    validThrough: "2026-02-08"  // When the job expires
  };

  // 2. THE "INVISIBLE" GOOGLE MAGIC
  useEffect(() => {
    // Create the structured data object
    const schemaData = {
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "title": job.title,
      "description": job.description,
      "datePosted": job.datePosted,
      "validThrough": job.validThrough,
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.company,
        "sameAs": "https://www.your-client-site.com"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Plainsboro",
          "addressRegion": "NJ",
          "addressCountry": "US"
        }
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": job.salaryMin,
          "maxValue": job.salaryMax,
          "unitText": "YEAR"
        }
      }
    };

    // Inject it into the <head> of the document
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    script.id = 'google-job-schema'; // ID to find it easily later
    document.head.appendChild(script);

    // Cleanup: Remove the tag if the user leaves the page
    return () => {
      const existingScript = document.getElementById('google-job-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [job]);

  // 3. THE VISIBLE UI (What the candidate sees)
  return (
    <div className="min-h-screen bg-slate-50 flex justify-center p-6 font-sans">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header Image */}
        <div className="h-48 bg-gradient-to-r from-indigo-900 to-indigo-600 relative">
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h1 className="text-4xl font-black tracking-tight mb-2">{job.title}</h1>
            <div className="flex items-center gap-4 text-sm font-medium opacity-90">
              <span className="flex items-center gap-1">🏢 {job.company}</span>
              <span className="flex items-center gap-1">📍 {job.location}</span>
              <span className="flex items-center gap-1">💰 ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-900 mb-4">About the Role</h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              {job.description}
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mb-4">Requirements</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-10">
              <li>5+ years of retail management experience.</li>
              <li>Proven track record of P&L management.</li>
              <li>Strong leadership and conflict resolution skills.</li>
            </ul>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-6 flex items-center justify-between border border-indigo-100">
            <div>
              <p className="text-indigo-900 font-bold text-lg">Interested?</p>
              <p className="text-indigo-600 text-sm">Applications close on {job.validThrough}</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-indigo-200">
              Apply Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PublicJobPage;
