import { render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

// jest.mock("../tree/FileIcon", () => {
// 	return () => {
// 		return "FileIcon";
// 	};
// });

function renderComponent() {
	const repository = {
		full_name: "facebook/react",
		language: "JavaScript",
		description:
			"A declarative, efficient, and flexible JavaScript library for building user interfaces.",
		owner: {
			login: "facebook",
		},
		name: "react",
		html_url: "https://www.github.com/facebook/react",
	};
	render(
		<MemoryRouter>
			<RepositoriesListItem repository={repository} />
		</MemoryRouter>
	);
	return { repository };
}

describe("RepositoriesSummary component", () => {
	it("displays a link to the GitHub homepage for this repository", async () => {
		const { repository } = renderComponent();

		await screen.findByRole("img", { name: repository.language });

		const link = screen.getByRole("link", {
			name: /github repository/i,
		});
		expect(link).toHaveAttribute("href", repository.html_url);
	});

	it("shows a file icon with the appropriate icon", async () => {
		const { repository } = renderComponent();

		const iconElement = await screen.findByRole("img", {
			name: repository.language,
		});

		expect(iconElement).toBeInTheDocument();
	});

	it("displays a link to the code editor page", async () => {
		const { repository } = renderComponent();

		await screen.findByRole("img", { name: repository.language });

		const link = await screen.findByRole("link", {
			name: new RegExp(repository.owner.login),
		});

		expect(link).toHaveAttribute(
			"href",
			`/repositories/${repository.full_name}`
		);
	});
});
