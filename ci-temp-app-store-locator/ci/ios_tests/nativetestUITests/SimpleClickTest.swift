//
//  SimpleClickTest.swift
//  nativetestUITests
//
//  Created by Stephen on 26/07/2018.
//  Copyright © 2018 Singlepoint. All rights reserved.
//

import XCTest

class SimpleClickTest: XCTestCase {
        
    override func setUp() {
        super.setUp()

        continueAfterFailure = false
        XCUIApplication().launch()
    }
    
    override func tearDown() {
        super.tearDown()
    }

    func testClicks() {

      let app = XCUIApplication()
      app/*@START_MENU_TOKEN@*/.otherElements.matching(identifier: "\n 1 React Redux Counter Invoke API Clear")/*[[".scrollViews.otherElements[\"\\n 1 React Redux Counter Invoke API Clear\"]",".otherElements.matching(identifier: \"\\n 1 React Redux Counter Invoke API Clear\")"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.otherElements["1 React Redux Counter"].children(matching: .other)["React Redux Counter"].tap()
      app/*@START_MENU_TOKEN@*/.otherElements.matching(identifier: "\n 2 React Redux Counter Invoke API Clear")/*[[".scrollViews.otherElements[\"\\n 2 React Redux Counter Invoke API Clear\"]",".otherElements.matching(identifier: \"\\n 2 React Redux Counter Invoke API Clear\")"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.otherElements["2 React Redux Counter"].children(matching: .other)["React Redux Counter"].tap()
      app/*@START_MENU_TOKEN@*/.otherElements.matching(identifier: "\n 3 React Redux Counter Invoke API Clear")/*[[".scrollViews.otherElements[\"\\n 3 React Redux Counter Invoke API Clear\"]",".otherElements.matching(identifier: \"\\n 3 React Redux Counter Invoke API Clear\")"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.otherElements["3 React Redux Counter"].children(matching: .other)["React Redux Counter"].tap()
      app/*@START_MENU_TOKEN@*/.otherElements.matching(identifier: "\n 4 React Redux Counter Invoke API Clear")/*[[".scrollViews.otherElements[\"\\n 4 React Redux Counter Invoke API Clear\"]",".otherElements.matching(identifier: \"\\n 4 React Redux Counter Invoke API Clear\")"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.otherElements["4 React Redux Counter"].children(matching: .other)["React Redux Counter"].tap()
  }
}
