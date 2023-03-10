import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import meeting from "assets/meeting.jpg";
import {
  useApplyJobMutation,
  useCloseJobByIdMutation,
  useGetJobByIdQuery,
} from "features/jobs/jobsAPI";
import Loading from "components/reusable/Loading";
import { resetError } from "features/auth/authSlice";

const JobDetails = () => {
  const { jobId } = useParams();
  const { data, isLoading } = useGetJobByIdQuery(jobId);
  const [applyNow, { isSuccess, isError, error }] = useApplyJobMutation();
  const [
    closeJob,
    { isSuccess: closeIsSuccess, isError: closeIsError, error: closeError },
  ] = useCloseJobByIdMutation();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLocation = useLocation();

  //Job Apply notifications
  useEffect(() => {
    if (isSuccess) {
      toast.success("Applied successfully");
      // navigate("/my-jobs");
    } else if (isError) {
      toast.error(error);
      dispatch(resetError());
    }
  }, [isSuccess, isError, error, dispatch]);

  //Job close notifications
  useEffect(() => {
    if (closeIsSuccess) {
      toast.success("Job closed successfully");
      navigate("/dashboard/my-jobs");
    } else if (closeIsError) {
      toast.error(closeError);
      dispatch(resetError());
    }
  }, [closeIsSuccess, closeIsError, closeError, dispatch, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  const {
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    applicants,
    queries,
    employerId,
    _id,
  } = data?.data || {};

  const handleJobApply = () => {
    if (!user?.email) {
      toast.error("please login first to apply");
      navigate("/login", { state: { from: currentLocation }, replace: true });
    } else if (!user?.role) {
      toast.error("please register as a Candidate to apply");
      navigate("/register", { state: { from: currentLocation }, replace: true });
    } else {
      const date = new Date();
      const applyData = {
        userId: user._id,
        email: user.email,
        name: user?.firstName + " " + user?.lastName,
        date: date.toISOString(),
      };
      applyNow({ applyData, jobId });
    }
  };

  return (
    <div className="pt-14 grid grid-cols-12 gap-5">
      <div className="col-span-9 mb-10">
        <div className="h-80 rounded-xl overflow-hidden">
          <img className="h-full w-full object-cover" src={meeting} alt="" />
        </div>
        <div className="space-y-5">
          <div className="flex justify-between items-center mt-5">
            <h1 className="text-xl font-semibold text-primary">{position}</h1>
            {user._id === employerId ? (
              <div className="flex space-x-2">
                <button
                  className="btn"
                  disabled={!applicants?.length}
                  onClick={() => navigate(`/dashboard/job-applicants/${_id}`)}
                >
                  View Applicants ({applicants?.length || "0"})
                </button>
                <button className="btn" onClick={() => closeJob(_id)}>
                  Close
                </button>
              </div>
            ) : (
              <button
                className="btn"
                disabled={
                  applicants.find((a) => a.email === user?.email) ||
                  user.role === "employer"
                }
                onClick={handleJobApply}
              >
                Apply
              </button>
            )}
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Skills</h1>
            <ul>
              {skills.map((skill) => (
                <li key={skill} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Requirements</h1>
            <ul>
              {requirements.map((req) => (
                <li key={req} className="flex items-center">
                  <BsArrowRightShort /> <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Responsibilities
            </h1>
            <ul>
              {responsibilities.map((res) => (
                <li key={res} className="flex items-center">
                  <BsArrowRightShort /> <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-5" />
        <div>
          <div>
            <h1 className="text-xl font-semibold text-primary mb-5">General Q&A</h1>
            <div className="text-primary my-2">
              {queries.map(({ question, email, reply, id }) => (
                <div>
                  <small>{email}</small>
                  <p className="text-lg font-medium">{question}</p>
                  {reply?.map((item) => (
                    <p
                      key={item}
                      className="flex items-center gap-2 relative left-5"
                    >
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  <div className="flex gap-3 my-5">
                    <input placeholder="Reply" type="text" className="w-full" />
                    <button
                      className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                      type="button"
                    >
                      <BsArrowRightShort size={30} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 my-5">
              <input
                placeholder="Ask a question..."
                type="text"
                className="w-full"
              />
              <button
                className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                type="button"
              >
                <BsArrowRightShort size={30} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="rounded-xl bg-primary/10 p-5 text-primary space-y-5">
          <div>
            <p>Experience</p>
            <h1 className="font-semibold text-lg">{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className="font-semibold text-lg">{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className="font-semibold text-lg">{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className="font-semibold text-lg">{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className="font-semibold text-lg">{location}</h1>
          </div>
        </div>
        <div className="mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5">
          <div>
            <h1 className="font-semibold text-lg">{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className="font-semibold text-lg">Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className="font-semibold text-lg">2021</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className="font-semibold text-lg">company@email.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className="font-semibold text-lg">Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a className="font-semibold text-lg" href="https://website.com">
              https://website.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
