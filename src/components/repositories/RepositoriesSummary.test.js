import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

const repository = {
	language: "TypeScript",
	stargazers_count: 100,
	open_issues: 10,
	forks: 20,
};

describe("RepositoriesSummary component", () => {
	it("displays the primary language of the repository", () => {
		render(<RepositoriesSummary repository={repository} />);

		const languageElement = screen.getByText(repository.language);
		expect(languageElement).toBeInTheDocument();
	});
});
