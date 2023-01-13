import Loading from "components/reusable/Loading";
import { useGetJobByIdQuery } from "features/jobs/jobsAPI";
import React from "react";
import { Link, useParams } from "react-router-dom";

const ShowCandidates = () => {
  const { jobId } = useParams();
  const { data, isLoading } = useGetJobByIdQuery(jobId);

  if (isLoading) {
    return <Loading />;
  }
  const { companyName, position, applicants } = data?.data || {};
  return (
    <section className="p-4">
      <div className="bg-primary/10 p-5 rounded-2xl mb-8">
        <h1 className="text-xl">Showing Applicants for position "{position}"</h1>
        <p className="pt-4">Company: {companyName}</p>
      </div>
      <div className="overflow-x-auto p-3">
        <table className="table-auto w-full">
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <th className="p-2">
                <div className="font-semibold text-left">Applicant Name</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-left">Email</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-left">Date Applied</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-center">Action</div>
              </th>
            </tr>
          </thead>

          <tbody className="text-sm divide-y divide-gray-100">
            {applicants?.map((applicant) => (
              <tr key={applicant.userId}>
                <td className="p-2">
                  <Link
                    to={`/dashboard/profile-view/${applicant.userId}`}
                    className="font-medium text-primary"
                  >
                    {applicant.name}
                  </Link>
                </td>
                <td className="p-2">
                  <div className="text-left">{applicant.email}</div>
                </td>
                <td className="p-2">
                  <div className="text-left font-medium">
                    {new Date(applicant?.date).toLocaleDateString("en-GB")}
                  </div>
                </td>
                <td className="p-2">
                  <div className="flex justify-center">
                    <button className="text-yellow-500">Approve</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ShowCandidates;
