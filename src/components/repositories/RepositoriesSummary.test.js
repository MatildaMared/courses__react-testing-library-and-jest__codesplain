import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

const repository = {
	language: "TypeScript",
	stargazers_count: 125,
	open_issues: 10,
	forks: 20,
};

describe("RepositoriesSummary component", () => {
	it("displays information about the repository", () => {
		render(<RepositoriesSummary repository={repository} />);

		Object.keys(repository).forEach((key) => {
			const value = repository[key];
			const element = screen.getByText(new RegExp(value));
			expect(element).toBeInTheDocument();
		});
	});
});
