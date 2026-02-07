Feature: UKMku Landing Page
  As a user
  I want to see a comprehensive landing page for UKMku
  So that I can understand the specialized divisions, goals, and contact information

  Background:
    Given I am on the UKMku landing page

  Scenario: Hero Section Display
    Then I should see the Hero section
    And I should see the tagline "tech with tecnology"
    And I should see a descriptive dummy text
    And I should see a "Join Now" button
    And I should see a "Learn More" button

  Scenario: Our Learning Path Section Display
    When I scroll to the "Our Learning Path" section
    Then I should see the following divisions:
      | proper_name |
      | Game        |
      | Software    |
      | Hardware    |
    And each division card should display a brief description of the training
    And I should see cards representing these paths

  Scenario: Our Goals Section Display
    When I scroll to the "Our Goals" section
    Then I should see the Cabinet Photo on the left side
    And I should see the Vision and Mission text on the right side

  Scenario: Footer Section Display
    When I scroll to the footer
    Then I should see the UKMku Logo
    And I should see the text "oxigen"
    And I should see the Instagram logo
    And I should see the Contact Person information for "Humaniora Internal"
    And I should see the Contact Person information for "Humaniora External"
    And I should see the UKMku copyright notice

  Scenario: Visual Theme and Styling
    Then the page should use the "Oxigen" color theme
    And the primary light color should be "#0051D2" (--color-oxigen-light)
    And the primary dark color should be "#001A57" (--color-oxigen-dark)
    And the logo background should be "white"
