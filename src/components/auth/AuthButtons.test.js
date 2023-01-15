import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";

async function renderComponent() {
	render(
		<MemoryRouter>
			<AuthButtons />
		</MemoryRouter>
	);

	await screen.findAllByRole("link");
}

describe("AuthButtons component", () => {
	describe("when the user is not signed in", () => {
		createServer([
			{
				url: "/api/user",
				res: (req, res, ctx) => {
					return { user: null };
				},
			},
		]);

		it("displays a sign in and sign up button", async () => {
			await renderComponent();

			const signInButton = screen.getByRole("link", {
				name: /sign in/i,
			});
			const signUpButton = screen.getByRole("link", {
				name: /sign up/i,
			});

			expect(signInButton).toBeInTheDocument();
			expect(signInButton).toHaveAttribute("href", "/signin");

			expect(signUpButton).toBeInTheDocument();
			expect(signUpButton).toHaveAttribute("href", "/signup");
		});

		it("does not display a sign out button", async () => {
			await renderComponent();

			const signOutButton = screen.queryByRole("link", {
				name: /sign out/i,
			});

			expect(signOutButton).not.toBeInTheDocument();
		});
	});

	describe("when the user is signed in", () => {
		createServer([
			{
				url: "/api/user",
				res: (req, res, ctx) => {
					return { user: { id: 3, email: "test@test.com" } };
				},
			},
		]);

		it("does not display a sign in and sign up button", async () => {
			await renderComponent();

			const signInButton = screen.queryByRole("link", {
				name: /sign in/i,
			});

			const signUpButton = screen.queryByRole("link", {
				name: /sign up/i,
			});

			expect(signInButton).not.toBeInTheDocument();
			expect(signUpButton).not.toBeInTheDocument();
		});

		it("displays a sign out button", async () => {
			await renderComponent();

			const signOutButton = screen.getByRole("link", {
				name: /sign out/i,
			});

			expect(signOutButton).toBeInTheDocument();
			expect(signOutButton).toHaveAttribute("href", "/signout");
		});
	});
});
