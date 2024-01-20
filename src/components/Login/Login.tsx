import { useSession, signIn, signOut } from "next-auth/react";

function Login() {
  const { data: session } = useSession();

  // signOut();
  async function signInWithGoogle() {
    await signIn("google");
  }
  return (
    <>
      <div className="flex flex-row justify-center items-center h-screen">
        <div className="border rounded-lg p-4">
          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mx-auto"
          >
            Login with Google
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
