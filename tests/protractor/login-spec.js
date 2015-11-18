/*
describe('angularjs homepage todo list', function() {
    it('should add a todo', function() {
        browser.get('https://angularjs.org');

        element(by.model('todoList.todoText')).sendKeys('write first protractor test');
        element(by.css('[value="add"]')).click();

        var todoList = element.all(by.repeater('todo in todoList.todos'));
        expect(todoList.count()).toEqual(3);
        expect(todoList.get(2).getText()).toEqual('write first protractor test');

        // You wrote your first test, cross it off the list
        todoList.get(2).element(by.css('input')).click();
        var completedAmount = element.all(by.css('.done-true'));
        expect(completedAmount.count()).toEqual(2);
    });
});*/


describe('Check Login jogApp', function() {

    beforeEach(function() {
        browser.get('http://jogapp');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('JogApp');
    });

    it('should have a welcome message', function() {
        expect(element(by.css('h2')).getText()).toEqual('Welcome');
    });

    it('should do correctly the login process', function() {
        browser.get('http://jogapp/signin');
        element(by.model('auth.user.email')).sendKeys('juampick@gmail.com');
        element(by.model('auth.user.password')).sendKeys('toptal');

        element(by.id('submit')).click();

        expect(element(by.binding('nav.currentUser.name')).getText()).
            toEqual('Juan Cook');
    });
});