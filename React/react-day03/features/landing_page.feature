Feature: Landing Page
  As a user
  I want to view the landing page
  So that I can understand what Oxigen is about and navigate to different sections

  Background:
    Given I am on the landing page "/"

  Scenario: Navbar functionality and navigation
    Then I should see the Navbar
    And I should see the "OXIGEN" logo
    And I should see navigation links "Home", "About", "Services", "Showcase"
    And I should see a "Join Us" button
    When I scroll down
    Then the Navbar should have a white background and shadow
    When I click the "Join Us" button
    Then I should be anchored to the "membership" section

  Scenario: Hero section display
    Then I should see the Hero section
    And I should see the main headline "Innovate. Create. Elevate."
    And I should see the "Start Your Journey" button
    When I click the "Start Your Journey" button
    Then I should be anchored to the "divisions" section

  Scenario: Divisions section display
    When I scroll to the "Divisions" section
    Then I should see the "Our Divisions" heading
    And I should see the following divisions:
      | Name       | Description                                      |
      | Hardware   | Physical computing and electronics engineering   |
      | Software   | Application development and system architecture  |
      | Game Dev   | Interactive entertainment and game design        |
    When I click on the "Hardware" division card
    Then I should be redirected to "/projects/hardware"

  Scenario: Showcase section display
    When I scroll to the "Showcase" section
    Then I should see the "Featured Projects" heading
    And I should see a grid of featured projects
    When I click on a project card
    Then I should be redirected to the project detail page

  Scenario: Footer display
    When I scroll to the bottom of the page
    Then I should see the Footer
    And I should see the "Oxigen" text
    And I should see social media links
