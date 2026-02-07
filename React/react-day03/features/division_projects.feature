Feature: Division Projects List
  As a user
  I want to see projects belonging to a specific division
  So that I can explore work relevant to my interests

  Scenario Outline: User views valid division projects
    Given I am on the landing page
    When I navigate to the "<Division>" division page "/projects/<DivisionPath>"
    Then I should see the heading "Project <DivisionName> 24"
    And I should see the division description "<Description>"
    And I should see a list of projects belonging to the "<Division>" division
    And each project card should display a title, thumbnail, and "View Project" link

    Examples:
      | Division | DivisionPath | DivisionName | Description                                     |
      | Hardware | hardware     | Hardware     | Physical computing and electronics engineering  |
      | Software | software     | Software     | Application development and system architecture |

  Scenario: User views empty division
    Given there are no projects for the "Research" division
    When I navigate to the "Research" division page "/projects/research"
    Then I should see a message "No projects found for this division yet."

  Scenario: User navigates to invalid division
    When I navigate to "/projects/invalid-division"
    Then I should see a "Division Not Found" message
    And I should see a "Back to Home" button
    When I click "Back to Home"
    Then I should be redirected to the landing page "/"

  Scenario: User filters/selects a project
    Given I am on the "Software" division page
    When I click on a project card with title "AI Chatbot"
    Then I should be redirected to the project detail page "/projects/software/ai-chatbot"
