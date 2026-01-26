# Implementation Plan: The Multilingual Mandi

## Overview

This implementation plan focuses on creating a web-based visualization concept demonstrating how Generative AI can transform India's local markets. The platform will be built using React for the frontend, with AI services integrated for translation, price discovery, and negotiation assistance. The implementation prioritizes visual clarity, voice-first interaction, and demonstration of AI capabilities.

Since this is a visualization concept for a competition (not a production system), the implementation will use simulated data and focus on creating compelling visual representations that can be demonstrated in under 2 minutes.

## Tasks

- [x] 1. Set up project structure and core infrastructure
  - Create React application with TypeScript
  - Set up Tailwind CSS for styling
  - Configure Web Speech API for voice input/output
  - Install fast-check for property-based testing
  - Set up basic routing structure
  - _Requirements: 1.1, 6.1, 7.1_

- [x] 2. Implement language selection component
  - [x] 2.1 Create LanguageSelectionComponent with language tiles
    - Display all 9 required Indian languages (Hindi, Tamil, Bengali, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi)
    - Implement large tiles (120px × 120px) with native script names
    - Add prominent microphone icon for voice selection
    - Use earthy color palette (terracotta, olive, cream)
    - _Requirements: 1.1, 7.1, 7.2, 7.5, 12.1_

  - [x] 2.2 Write unit test for language selection interface
    - Test that all 9 required languages are displayed
    - Test language tile rendering with native scripts
    - \_Requirements: 1erface\*\*
    - **Validates: Requirements 1.5**

- [x] 3. Implement voice interface component
  - [x] 3.1 Create VoiceInterface component with Web Speech API
    - Implement speech-to-text conversion
    - Implement text-to-speech conversion
    - Add visual feedback (pulsing microphone icon)
    - Handle voice input in selected language
    - _Requirements: 1.3, 1.4, 6.3_

  - [x] 3.2 Implement voice feedback system
    - Provide voice confirmation for actions
    - Support all 9 Indian languages
    - Handle unclear input with clarification requests
    - _Requirements: 1.6, 6.3_

  - [x] 3.3 Write property test for voice-to-text round trip
    - **Property 3: Voice-to-Text Round Trip**
    - **Validates: Requirements 1.3**

  - [x] 3.4 Write property test for voice feedback
    - **Property 16: Voice Feedback for Interactions**
    - **Validates: Requirements 6.3**

  - [x] 3.5 Write unit test for unclear input handling
    - Test clarification request for low-confidence input
    - Test error messages in user's language
    - _Requirements: 1.6_

- [ ] 4. Implement translation service
  - [ ] 4.1 Create TranslationService with AI integration
    - Integrate with OpenAI GPT-4 or Google Gemini API
    - Implement translate() method for language pairs
    - Implement translateWithContext() for conversation context
    - Handle culturally specific terms
    - _Requirements: 2.1, 2.3, 2.4, 2.5_

  - [ ] 4.2 Add language tag display for translations
    - Show source language indicator on translated messages
    - Use small badge with language code
    - _Requirements: 2.2_

  - [ ] 4.3 Write property test for cross-language translation
    - **Property 4: Cross-Language Translation Preservation**
    - **Validates: Requirements 2.1**

  - [ ] 4.4 Write property test for language tag display
    - **Property 5: Translation Language Tag Display**
    - **Validates: Requirements 2.2, 9.2**

  - [ ] 4.5 Write unit test for cultural term translation
    - Test specific mandi terminology translations
    - Test commodity name translations
    - _Requirements: 2.4_

- [x] 5. Implement AI price engine
  - [x] 5.1 Create AIPriceEngine with simulated market data
    - Generate fair price ranges based on commodity details
    - Simulate market trends (demand, supply, seasonality)
    - Factor in location, quality, and season
    - _Requirements: 3.1, 3.3_

  - [x] 5.2 Implement price explanation generation
    - Create PriceExplanation with factors and reasoning
    - Generate simple, non-technical explanations
    - Support all 9 Indian languages
    - _Requirements: 3.2, 10.1, 10.3_

  - [x] 5.3 Add "Why this price?" panel component
    - Create expandable explanation panel
    - Display price factors with impact indicators
    - Show brief summary and detailed reasoning
    - _Requirements: 3.4_

  - [x] 5.4 Write property test for price generation
    - **Property 6: Price Generation for Commodities**
    - **Validates: Requirements 3.1, 8.2**

  - [x] 5.5 Write property test for price explanation presence
    - **Property 7: Price Explanation Presence**
    - **Validates: Requirements 3.2, 8.3, 10.1**

  - [x] 5.6 Write property test for price updates
    - **Property 8: Price Update on Market Changes**
    - **Validates: Requirements 3.3**

  - [x] 5.7 Write property test for price consistency
    - **Property 9: Price Consistency for Similar Commodities**
    - **Validates: Requirements 3.5**

  - [x] 5.8 Write unit test for price explanation panel
    - Test panel display on user request
    - Test explanation content structure
    - _Requirements: 3.4_

- [ ] 6. Checkpoint - Ensure core AI services are working
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implement AI negotiation assistant
  - [ ] 7.1 Create AINegotiationAssistant with AI integration
    - Generate polite counter-offer suggestions
    - Create culturally neutral, respectful messages
    - Suggest compromises for stalled negotiations
    - Provide reasoning for all suggestions
    - _Requirements: 4.1, 4.3, 4.4, 4.5, 4.6_

  - [ ] 7.2 Add one-tap negotiation action buttons
    - Create Accept and Counter buttons
    - Implement AI suggestion display panel
    - Show reasoning for suggestions
    - _Requirements: 4.2_

  - [ ] 7.3 Write property test for counter-offer generation
    - **Property 10: Counter-Offer Generation**
    - **Validates: Requirements 4.1**

  - [ ] 7.4 Write property test for negotiation suggestion explanation
    - **Property 11: Negotiation Suggestion Explanation**
    - **Validates: Requirements 4.5, 10.2**

  - [ ] 7.5 Write unit test for one-tap options
    - Test Accept and Counter buttons display
    - Test button functionality
    - _Requirements: 4.2_

  - [ ] 7.6 Write unit test for compromise suggestion
    - Test compromise generation on impasse
    - Test compromise reasoning
    - _Requirements: 4.4_

- [x] 8. Implement data models and state management
  - [x] 8.1 Create TypeScript interfaces for all data models
    - Define User, Commodity, Listing, Negotiation, Deal models
    - Define PriceSuggestion, Offer, Message models
    - Define MarketTrend model for simulated data
    - _Requirements: 3.1, 5.1, 8.1, 9.1_

  - [x] 8.2 Set up React Context or Redux for state management
    - Create context for user preferences (language, role)
    - Create context for listings and negotiations
    - Create context for mandi board state
    - _Requirements: 1.2, 5.1, 8.1_

  - [x] 8.3 Implement simulated market data generator
    - Generate realistic commodity prices
    - Simulate seasonal trends
    - Factor in location-based variations
    - _Requirements: 3.1, 3.3_

- [x] 9. Implement digital mandi board component
  - [x] 9.1 Create DigitalMandiBoard component
    - Display all active commodity listings in card layout
    - Show commodity name, vendor location, quantity, price
    - Implement responsive grid layout
    - Use large, readable fonts
    - _Requirements: 5.1, 5.2, 12.4_

  - [x] 9.2 Add best price highlighting
    - Identify lowest price for each commodity type
    - Highlight with green border or star icon
    - _Requirements: 5.3_

  - [x] 9.3 Implement real-time listing updates
    - Update board when new listings are added
    - Update status when deals are finalized
    - Remove or mark sold listings
    - _Requirements: 5.4, 5.5_

  - [x] 9.4 Add location tags with map pin icons
    - Display location for each listing
    - Use clear, contextually relevant tags
    - _Requirements: 5.6_

  - [x] 9.5 Write property test for active listings display
    - **Property 12: Active Listings Display**
    - **Validates: Requirements 5.1, 5.4**

  - [x] 9.6 Write property test for listing field completeness
    - **Property 13: Listing Field Completeness**
    - **Validates: Requirements 5.2**

  - [x] 9.7 Write property test for best price highlighting
    - **Property 14: Best Price Highlighting**
    - **Validates: Requirements 5.3**

  - [x] 9.8 Write property test for listing status update
    - **Property 15: Listing Status Update on Deal Finalization**
    - **Validates: Requirements 5.5**

- [x] 10. Implement vendor dashboard component
  - [x] 10.1 Create VendorDashboard component
    - Display commodity listing form
    - Show AI price suggestion with explanation
    - Display vendor's active listings
    - Show negotiation status for each listing
    - _Requirements: 8.1, 8.6, 12.2_

  - [x] 10.2 Implement commodity listing creation flow
    - Accept commodity details via voice or text
    - Request AI price suggestion
    - Display "Why this price?" panel
    - Create listing and update mandi board
    - _Requirements: 8.2, 8.3, 8.4, 8.5_

  - [x] 10.3 Add voice input for commodity details
    - Enable voice entry for all fields
    - Provide voice feedback for each field
    - _Requirements: 6.6, 8.2_

  - [x] 10.4 Write property test for listing creation and board update
    - **Property 19: Listing Creation and Board Update**
    - **Validates: Requirements 8.4, 8.5**

  - [x] 10.5 Write property test for vendor listing status display
    - **Property 20: Vendor Listing Status Display**
    - **Validates: Requirements 8.6**

  - [x] 10.6 Write unit test for vendor dashboard display
    - Test dashboard interface rendering
    - Test commodity form display
    - _Requirements: 8.1_

- [ ] 11. Checkpoint - Ensure vendor flow is complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Implement negotiation interface component
  - [ ] 12.1 Create NegotiationInterface component with split-view layout
    - Display buyer perspective on left, vendor on right
    - Show conversation history
    - Display language tags on messages
    - Show AI suggestion panel
    - _Requirements: 9.1, 9.2, 9.4, 12.3_

  - [ ] 12.2 Implement offer and counter-offer functionality
    - Allow users to send offers
    - Display AI-generated suggestions
    - Provide one-tap accept/counter options
    - _Requirements: 9.3, 4.2_

  - [ ] 12.3 Add real-time translation for negotiation messages
    - Translate messages between buyer and vendor languages
    - Display original language tags
    - Preserve conversation context
    - _Requirements: 9.6, 2.1_

  - [ ] 12.4 Implement deal finalization
    - Display confirmation screen with final terms
    - Update listing status to sold
    - Create deal record
    - _Requirements: 9.5, 5.5_

  - [ ] 12.5 Write property test for offer suggestion panel display
    - **Property 21: Offer Suggestion Panel Display**
    - **Validates: Requirements 9.3**

  - [ ] 12.6 Write property test for negotiation history maintenance
    - **Property 22: Negotiation History Maintenance**
    - **Validates: Requirements 9.4**

  - [ ] 12.7 Write property test for real-time negotiation translation
    - **Property 23: Real-Time Negotiation Translation**
    - **Validates: Requirements 9.6**

  - [ ] 12.8 Write unit test for split-view interface
    - Test layout rendering
    - Test buyer/vendor perspective display
    - _Requirements: 9.1_

  - [ ] 12.9 Write unit test for deal confirmation screen
    - Test confirmation display
    - Test final terms display
    - _Requirements: 9.5_

- [ ] 13. Implement complete user flows
  - [ ] 13.1 Implement user onboarding flow
    - Guide new users through language selection
    - Transition to main interface
    - Provide feature introduction
    - _Requirements: 11.1_

  - [ ] 13.2 Implement vendor listing flow
    - Execute: commodity entry → AI price suggestion → listing creation → mandi board update
    - Ensure each step completes before next begins
    - Provide clear feedback at each step
    - _Requirements: 11.2, 11.5_

  - [ ] 13.3 Implement buyer negotiation flow
    - Execute: offer creation → translation → AI suggestion → vendor notification
    - Ensure each step completes successfully
    - Provide clear feedback at each step
    - _Requirements: 11.3, 11.5_

  - [ ] 13.4 Implement deal finalization flow
    - Execute: agreement confirmation → listing update → deal finalization
    - Ensure each step completes successfully
    - Provide clear feedback at each step
    - _Requirements: 11.4, 11.5_

  - [ ] 13.5 Write property test for vendor listing flow completion
    - **Property 24: Vendor Listing Flow Completion**
    - **Validates: Requirements 11.2**

  - [ ] 13.6 Write property test for buyer negotiation flow completion
    - **Property 25: Buyer Negotiation Flow Completion**
    - **Validates: Requirements 11.3**

  - [ ] 13.7 Write property test for deal finalization flow completion
    - **Property 26: Deal Finalization Flow Completion**
    - **Validates: Requirements 11.4**

  - [ ] 13.8 Write unit test for user onboarding flow
    - Test language selection → main interface transition
    - Test feature introduction display
    - _Requirements: 11.1_

- [ ] 14. Implement voice command system
  - [ ] 14.1 Create voice command parser
    - Parse voice commands for all primary actions
    - Support commands in all 9 languages
    - Handle list commodity, make offer, accept deal, select language
    - _Requirements: 6.6, 7.6_

  - [ ] 14.2 Integrate voice commands with all components
    - Enable voice listing creation
    - Enable voice offer submission
    - Enable voice deal acceptance
    - Enable voice language selection
    - _Requirements: 6.6_

  - [ ] 14.3 Write property test for voice command completeness
    - **Property 17: Voice Command Completeness**
    - **Validates: Requirements 6.6**

- [ ] 15. Implement UI interaction enhancements
  - [ ] 15.1 Add hover/focus feedback for language tiles
    - Implement visual feedback (color change, border, animation)
    - Ensure accessibility for keyboard navigation
    - _Requirements: 7.3_

  - [ ] 15.2 Implement large, high-contrast buttons
    - Create button components with universal icons
    - Ensure minimum 44px × 44px touch targets
    - Use earthy color palette
    - _Requirements: 6.1_

  - [ ] 15.3 Write property test for language tile interaction feedback
    - **Property 18: Language Tile Interaction Feedback**
    - **Validates: Requirements 7.3**

  - [ ] 15.4 Write unit test for voice-first design elements
    - Test button sizes and contrast
    - Test icon display
    - _Requirements: 6.1_

- [ ] 16. Implement error handling
  - [ ] 16.1 Add voice input error handling
    - Handle unclear speech with clarification requests
    - Handle unsupported language detection
    - Handle no audio input scenarios
    - Display errors in user's language
    - _Requirements: 1.6_

  - [ ] 16.2 Add translation error handling
    - Handle translation service unavailability
    - Handle ambiguous translations with warnings
    - Provide fallback to single language mode
    - _Requirements: 2.5_

  - [ ] 16.3 Add price engine error handling
    - Handle insufficient market data
    - Handle invalid commodity details
    - Provide clear error messages and guidance
    - _Requirements: 3.1_

  - [ ] 16.4 Add negotiation error handling
    - Handle offers outside reasonable range
    - Handle negotiation timeouts
    - Provide warnings and suggestions
    - _Requirements: 4.4_

  - [ ] 16.5 Write unit tests for all error scenarios
    - Test voice input errors
    - Test translation errors
    - Test price engine errors
    - Test negotiation errors

- [ ] 17. Checkpoint - Ensure all flows and error handling work
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 18. Create demonstration visualizations
  - [ ] 18.1 Polish language selection screen visualization
    - Ensure large language tiles (120px × 120px)
    - Verify voice icon prominence
    - Verify minimal text, maximum visual clarity
    - _Requirements: 12.1_

  - [ ] 18.2 Polish vendor dashboard visualization
    - Ensure commodity card is clear and prominent
    - Verify AI-suggested price display
    - Verify "Why this price?" explanation panel
    - _Requirements: 12.2_

  - [ ] 18.3 Polish negotiation screen visualization
    - Ensure split buyer-vendor view is clear
    - Verify language tags are visible
    - Verify AI suggestion panel is prominent
    - _Requirements: 12.3_

  - [ ] 18.4 Polish digital mandi board visualization
    - Ensure commodity listings are clear
    - Verify best price highlighting (green border/star)
    - Verify location tags with map pin icons
    - _Requirements: 12.4_

  - [ ] 18.5 Write unit tests for all visualization screens
    - Test language selection screen elements
    - Test vendor dashboard elements
    - Test negotiation screen elements
    - Test mandi board elements
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [ ] 19. Create demo script and sample data
  - [ ] 19.1 Create sample commodity data
    - Generate realistic Indian commodities (rice, wheat, vegetables)
    - Create sample vendors and buyers
    - Generate sample market trends
    - _Requirements: 3.1, 5.1_

  - [ ] 19.2 Implement demo mode with guided flow
    - Create step-by-step demo script
    - Show language selection → listing → negotiation → deal
    - Highlight AI contributions at each step
    - Ensure demo completes in under 2 minutes
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 12.5_

  - [ ] 19.3 Add visual indicators for AI contributions
    - Highlight AI price suggestions
    - Highlight AI translation
    - Highlight AI negotiation assistance
    - Make AI role transparent and visible
    - _Requirements: 10.1, 10.2, 12.5_

- [ ] 20. Accessibility and responsive design
  - [ ] 20.1 Implement keyboard navigation
    - Ensure all functionality accessible via keyboard
    - Add visible focus indicators
    - Implement logical tab order
    - _Requirements: 6.1, 7.3_

  - [ ] 20.2 Add ARIA labels and semantic HTML
    - Add ARIA labels for all interactive elements
    - Use semantic HTML elements
    - Add skip navigation links
    - _Requirements: 6.2_

  - [ ] 20.3 Implement responsive design for mobile
    - Ensure all screens work on mobile devices
    - Optimize touch interactions
    - Test on various screen sizes
    - _Requirements: 6.1_

  - [ ] 20.4 Perform accessibility testing
    - Test with screen readers
    - Test keyboard navigation
    - Verify WCAG AAA compliance for contrast

- [ ] 21. Final integration and polish
  - [ ] 21.1 Integrate all components into main application
    - Wire language selection to all components
    - Connect vendor dashboard to mandi board
    - Connect negotiation interface to listings
    - Ensure smooth transitions between screens
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [ ] 21.2 Optimize performance
    - Implement lazy loading for components
    - Optimize voice processing
    - Cache translations
    - Minimize API calls
    - _Requirements: 1.3, 2.1_

  - [ ] 21.3 Add visual polish and animations
    - Add smooth transitions between screens
    - Add loading indicators
    - Add success animations
    - Ensure consistent visual language
    - _Requirements: 7.4, 11.5_

  - [ ] 21.4 Perform end-to-end testing
    - Test complete user journeys
    - Test cross-browser compatibility
    - Test mobile responsiveness
    - Test with sample users

- [ ] 22. Final checkpoint - Complete demonstration ready
  - Ensure all tests pass, ask the user if questions arise.
  - Verify demo can be completed in under 2 minutes
  - Confirm all AI contributions are visible and transparent
  - Ensure visual design communicates India-first problem and solution

## Notes

- All tasks are required for comprehensive implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties (minimum 100 iterations each)
- Unit tests validate specific examples, edge cases, and error conditions
- Focus on visual clarity and demonstration impact for competition submission
- Demo should complete in under 2 minutes to meet competition requirements
- All AI contributions should be transparent and clearly visible to judges
