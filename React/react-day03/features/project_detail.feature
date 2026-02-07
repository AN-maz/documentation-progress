Feature: Project Detail Page
  As a user
  I want to view the details of a specific project
  So that I can learn more about its features and the team behind it

  Scenario: User views project details
    Given I navigate to the project page "/projects/software/ai-chatbot"
    Then I should see the project title "AI Chatbot"
    And I should see the breadcrumb "Home / Software / AI Chatbot"
    And I should see a video player for the project demo
    And I should see the "Project Review" section with the full description
    And I should see the "The Makers" section with a list of team members

  Scenario: User plays project video
    Given I am on the project page "/projects/software/ai-chatbot"
    When I click the play button on the video player
    Then the video should start playing

  Scenario: User navigates back via breadcrumbs
    Given I am on the project page "/projects/software/ai-chatbot"
    When I click on the "Software" link in the breadcrumbs
    Then I should be redirected to the "Software" division page "/projects/software"
    When I click on the "Home" link in the breadcrumbs
    Then I should be redirected to the landing page "/"

  Scenario: User views invalid project
    When I navigate to "/projects/software/non-existent-project"
    Then I should see a "Project Not Found" message
    And I should see a "Back to Home" button
    When I click "Back to Home"
    Then I should be redirected to the landing page "/"
