import React, { use, useMemo, useState } from "react";
import { BsEye } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import logo from "/logo.svg";
// import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const location = useLocation();

  //   const { userLogin } = useAuth();
  const { signInUser, googleSignIn } = use(AuthContext);
  const navigator = useNavigate();

  // simple password strength estimator
  const pwStrength = useMemo(() => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    return score; // 0..4
  }, [pw]);

  // color for strength bar
  const strengthColor = [
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-emerald-400",
    "bg-green-600",
  ];
  const strengthLabel = ["Very weak", "Weak", "Fair", "Good", "Strong"];

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Successfully Logged!");

        navigator(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid-credential");
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        // console.log(result.user);
        toast.success("Successfully Logged!");
        navigator(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className=" flex items-stretch  rounded-sm">
        {/* Left illustration / brand panel (hidden on small screens) */}
        <svg
            className="absolute -right-114 top-120 w-[650px] h-[650px] opacity-25 blur-xl transition-all duration-500"
            viewBox="0 0 600 600"
            aria-hidden
          >
            <defs>
              <linearGradient id="gA" x1="0" x2="1">
                <stop offset="0%" stopColor="#bbf7d0" />
                <stop offset="100%" stopColor="#d1fae5" />
              </linearGradient>
            </defs>
            <path
              fill="url(#gA)"
              d="M421,325Q371,400,306,435Q241,470,176,428Q111,386,74,330Q37,274,83,217Q129,160,204,124Q279,88,335,130Q391,172,429,238Q467,304,421,325Z"
            />
          </svg>
        <aside className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
          {/* large animated blob */}
          <svg
            className="absolute -left-32 -top-28 w-[650px] h-[650px] opacity-25 blur-xl transition-all duration-500 "
            viewBox="0 0 600 600"
            aria-hidden
          >
            <defs>
              <linearGradient id="gA" x1="0" x2="1">
                <stop offset="0%" stopColor="#bbf7d0" />
                <stop offset="100%" stopColor="#d1fae5" />
              </linearGradient>
            </defs>
            <path
              fill="url(#gA)"
              d="M421,325Q371,400,306,435Q241,470,176,428Q111,386,74,330Q37,274,83,217Q129,160,204,124Q279,88,335,130Q391,172,429,238Q467,304,421,325Z"
            />
          </svg>
          <svg
            className="absolute -right-32 -button-28 w-[650px] h-[650px] opacity-25 blur-xl transition-all duration-500"
            viewBox="0 0 600 600"
            aria-hidden
          >
            <defs>
              <linearGradient id="gA" x1="0" x2="1">
                <stop offset="0%" stopColor="#bbf7d0" />
                <stop offset="100%" stopColor="#d1fae5" />
              </linearGradient>
            </defs>
            <path
              fill="url(#gA)"
              d="M421,325Q371,400,306,435Q241,470,176,428Q111,386,74,330Q37,274,83,217Q129,160,204,124Q279,88,335,130Q391,172,429,238Q467,304,421,325Z"
            />
          </svg>

          {/* subtle dashed accent */}
          <svg
            className="absolute left-14 top-24 w-40 h-40 text-yellow-300 opacity-50"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden
          >
            <path
              d="M4 20c6 0 12-10 32-8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="3 4"
            />
          </svg>

          {/* Illustration card */}
          <div className="relative max-w-md p-10 rounded-3xl shadow-2xl bg-[#fffbeb]/60 backdrop-blur-sm border border-white/40">
            <h2 className=" text-center text-3xl font-extrabold text-gray-900 mb-4">
              Welcome back to The Book Haven
            </h2>
            <p className="text-gray-700 mb-6">
              Your books. Your knowledge. Log in to continue your reading
              journey.
            </p>

            {/* small highlights */}
            <div className="flex gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white shadow flex items-center justify-center text-emerald-600 font-bold">
                  24k
                </div>
                <div>
                  <div className="text-sm text-gray-600 font-semibold">
                    Readers
                  </div>
                  <div className="text-xs text-gray-500">
                    A trusted book-loving community
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white shadow flex items-center justify-center text-emerald-600 font-bold">
                  1.2k
                </div>
                <div>
                  <div className="text-sm text-gray-600 font-semibold">
                    Collections
                  </div>
                  <div className="text-xs text-gray-500">
                    Curated and practical reading experiences
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right: Auth form panel */}
        <main className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-xl">
            {/* Floating glass card */}
            <div className="relative bg-[#fffbeb]/70 backdrop-blur-sm border border-white/40 rounded-3xl p-8 md:p-10 shadow-xl overflow-visible">
              {/* top-brand / small nav */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 ">
                    <img src={logo} alt="" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Welcome back to</div>
                    <div className="font-semibold text-slate-900">
                      The Book Haven
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex gap-3 items-center">
                  <Link
                    to="/"
                    className="text-sm text-gray-600 hover:text-emerald-600"
                  >
                    Home
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm text-gray-600 hover:text-emerald-600"
                  >
                    Sign up
                  </Link>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Sign in to your account
              </h1>

              <div className=" mb-5">
                <button
                  onClick={() => handleGoogleSignIn()}
                  className="btn bg-white w-full shadow-none hover:border-green-500  text-black border-[#e5e5e5]"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Continue with Google
                </button>
              </div>

              <form onSubmit={handleLoginSubmit} Validate>
                {/* social buttons */}

                {/* separator */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <div className="text-xs text-gray-400">
                    or continue with email
                  </div>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* email field (animated label) */}
                <label htmlFor="" className="text-black font-semibold block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="border border-gray-300 rounded-sm w-full py-2 px-2 text-black focus:border-green-500"
                  placeholder="Enter your email"
                />

                {/* password field */}
                <div className="relative mt-3 mb-3">
                  <label htmlFor="" className="text-black font-semibold block">
                    Password
                  </label>
                  <input
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    type={show ? "text" : "password"}
                    name="password"
                    className="border border-gray-300 py-2 px-2 rounded-sm w-full text-black"
                    placeholder="Enter your password"
                  />
                  <button
                    onClick={() => setShow(!show)}
                    className="text-black absolute right-2 bottom-2.5"
                  >
                    {show ? (
                      <BsEye className="text-emerald-600" />
                    ) : (
                      <FiEyeOff className="text-emerald-600" />
                    )}
                  </button>
                </div>

                {/* password strength */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
                    <div
                      className={`h-full rounded-full transition-all ${
                        pwStrength > 0
                          ? strengthColor[Math.max(0, pwStrength - 1)]
                          : "bg-gray-200"
                      }`}
                      style={{ width: `${(pwStrength / 4) * 100}%` }}
                      aria-hidden
                    />
                  </div>
                  <div className="text-xs text-gray-500  min-w-[80px] text-right">
                    {strengthLabel[pwStrength]}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={() => setRemember((r) => !r)}
                      className="w-4 h-4 rounded shadow checkbox text-black "
                    />
                    Remember me
                  </label>

                  <Link
                    to="#"
                    className="text-sm text-emerald-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl cursor-pointer bg-amber-700 hover:bg-amber-800 text-white font-semibold transition-shadow shadow"
                >
                  Login
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="text-emerald-600 font-medium">
                    Create one
                  </Link>
                </p>
              </form>
            </div>

            {/* footer micro info */}
            <div className="mt-6 text-center text-xs text-gray-400">
              By signing in you agree to our{" "}
              <Link to="/terms" className="underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline">
                Privacy
              </Link>
              .
            </div>
          </div>
        </main>

        {/* Mobile-only quick footer bar */}
        <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] bg-white/80 backdrop-blur rounded-xl p-3 shadow-md flex items-center justify-between">
          <div className="text-sm text-gray-700">New here?</div>
          <Link to="/signup" className="text-emerald-600 font-medium">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
