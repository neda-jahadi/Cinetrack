import { useNavigate } from "react-router";
import { useLogout } from "../../features/auth/authQueries";
import Container from "../ui/Container";
import ButtonLink from "../ui/ButtonLink";
import Button from "../ui/Button";

const ContinueAsUserCard = ({ name }: { name: string }) => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleAnotherAccount = (type?: string) => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        const url = type ? `/business/${type}` : "";
        navigate(url);
      },
    });
  };

  return (
    <section>
      <Container size="narrow" className="text-center flex flex-col gap-4">
        <h1 className="section-title">Business Account Setup</h1>
        <h2 className="card-title mt-7">You are signed in as {name}</h2>
        <p className="mt-3 text-slate-600">
          To create job posts, you need to register a company. You can continue
          with your current account or switch to another account.
        </p>

        <ButtonLink to="/business/register-company">
          Continue as {name}
        </ButtonLink>

        <Button
          variant="secondary"
          className="flex flex-col mt-10"
          onClick={() => handleAnotherAccount()}
        >
          Use another account
          <span className="mt-2 block">
            Log out and sign in with a different account
          </span>
        </Button>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-300" />
          <span className="text-sm text-slate-500">OR</span>
          <div className="h-px flex-1 bg-slate-300" />
        </div>

        <Button
          variant="dark"
          className="flex flex-col"
          onClick={() => handleAnotherAccount("signup")}
        >
          Create a new business account
          <span className=" mt-2 block">
            Log out and create a separate account for your company
          </span>
        </Button>
      </Container>
    </section>
  );
};

export default ContinueAsUserCard;
