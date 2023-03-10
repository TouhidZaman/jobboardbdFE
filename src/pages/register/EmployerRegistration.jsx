import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft } from "react-icons/fa";
import { toast } from "react-hot-toast";

import { useAddUserMutation } from "features/auth/authAPI";
import { resetError } from "features/auth/authSlice";
import Loading from "components/reusable/Loading";

const EmployerRegistration = () => {
  const {
    user: { email },
    isLoading,
  } = useSelector((state) => state.auth);
  const [postUser, { isSuccess, isError, error }] = useAddUserMutation();
  const dispatch = useDispatch();
  const { handleSubmit, register, reset, control } = useForm();
  const navigate = useNavigate();
  const term = useWatch({ control, name: "term" });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Employee registration successful");
      navigate("/dashboard");
    } else if (isError) {
      toast.error(error);
      dispatch(resetError());
    }
  }, [isSuccess, navigate, isError, error, dispatch]);

  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset({ email });
  }, [email, reset]);

  if (isLoading) {
    return <Loading />;
  }

  const businessCategory = [
    "Automotive",
    "Business Support & Supplies",
    "Computers & Electronics",
    "Construction & Contractors",
    "Design Agency",
    "Education",
    "Entertainment",
    "Food & Dining",
    "Health & Medicine",
    "Home & Garden",
    "IT Farm",
    "Legal & Financial",
    "Manufacturing, Wholesale, Distribution",
    "Merchants (Retail)",
    "Miscellaneous",
    "Personal Care & Services",
    "Real Estate",
    "Travel & Transportation",
  ];

  const employeeRange = ["1 - 10", "11 - 50", "51 - 100", "Above 100"];

  const onSubmit = (data) => postUser({ ...data, email, role: "employer" });

  return (
    <div className="pt-14">
      <div
        onClick={() => navigate("/register")}
        className="cursor-pointer w-fit mt-5 flex items-center"
      >
        <FaChevronLeft />
        <p>back</p>
      </div>
      <div className="flex justify-center items-center overflow-auto p-10">
        <form
          className="bg-secondary/20 shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="w-full text-2xl text-primary mb-5">Employer</h1>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="firstName">
              First Name
            </label>
            <input type="text" id="firstName" {...register("firstName")} />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input type="text" id="lastName" {...register("lastName")} />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="cursor-not-allowed"
              id="email"
              disabled
              {...register("email")}
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <h1 className="mb-3">Gender</h1>
            <div className="flex gap-3">
              <div>
                <input type="radio" id="male" {...register("gender")} value="male" />
                <label className="ml-2 text-lg" htmlFor="male">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  {...register("gender")}
                  value="female"
                />
                <label className="ml-2 text-lg" htmlFor="female">
                  Female
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  {...register("gender")}
                  value="other"
                />
                <label className="ml-2 text-lg" htmlFor="other">
                  Other
                </label>
              </div>
            </div>
          </div>
          <hr className="w-full mt-2 bg-black" />
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="companyName">
              Company's name
            </label>
            <input type="text" {...register("companyName")} id="companyName" />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-3" htmlFor="employeeRange">
              Number of employee
            </label>
            <select {...register("employeeRange")} id="employeeRange">
              {employeeRange
                .sort((a, b) => a.localeCompare(b))
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-3" htmlFor="companyCategory">
              Company's Category
            </label>
            <select {...register("companyCategory")} id="companyCategory">
              {businessCategory
                .sort((a, b) => a.localeCompare(b))
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="roleInCompany">
              Your role in company
            </label>
            <input type="text" {...register("roleInCompany")} id="roleInCompany" />
          </div>

          <div className="flex justify-between items-center w-full mt-3">
            <div className="flex  w-full max-w-xs">
              <input
                className="mr-3"
                type="checkbox"
                {...register("term")}
                id="terms"
              />
              <label htmlFor="terms">I agree to terms and conditions</label>
            </div>
            <button disabled={!term} className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerRegistration;

