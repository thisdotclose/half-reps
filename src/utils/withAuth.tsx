import { auth } from "@/lib/auth";
import { Session } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type WithAuthProps = {
    session: Session;
}

export function withAuth<P extends WithAuthProps>(
    WrappedComponent: React.ComponentType<P>
) {
    return async function AuthenticatedComponent(
        props: Omit<P, keyof WithAuthProps>
    ) {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            redirect("/login");
        }

        return (
            <WrappedComponent {...(props as P)} session={session} />
        );
    }
}