/**
 * @jest-environment jsdom
 */

const { notifyUser, init } = require("./script");
const fs = require("fs");
const path = require("path");

describe("User Stories Validation", () => {
    let input;
    let form;

    beforeEach(() => {
        const html = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf8");
        document.body.innerHTML = html;
        input = document.getElementById('binary');
        form = document.getElementById('formConverter');
        global.alert = jest.fn();
        init();
    });
    describe('Development tests', () => {
        it("should call a message of developing feature", () => {
            form.dispatchEvent(new SubmitEvent("submit"));
            expect(global.alert).toHaveBeenCalledWith("Funcionalidade em desenvolvimento!");
        });
        it("should not to submit form", () => {
            const event = new SubmitEvent("submit");
            const preventSpy = jest.spyOn(event, "preventDefault");
            form.dispatchEvent(event);
            expect(preventSpy).toHaveBeenCalled();
        })
    });
    describe('User can enter up to 8 binary digits in one input field', () => {

        it("should accepts values 0 and 1 without calling alert", () => {
            input.value = '0';
            input.dispatchEvent(new InputEvent('input', { data: '0' }));
            expect(global.alert).not.toHaveBeenCalled();

            input.value = '1';
            input.dispatchEvent(new InputEvent('input', { data: '1' }));
            expect(global.alert).not.toHaveBeenCalled();
        });
        it("should allows deleting characters with backspace without calling alert", () => {
            input.value = '01';
            input.dispatchEvent(new InputEvent('input', { data: '1' }));

            input.value = '0';
            input.dispatchEvent(new InputEvent('input', { data: null }));

            expect(global.alert).not.toHaveBeenCalled();
            expect(input.value).toBe('0');
        });

        it("should allows up to 8 binary digits in one input field", () => {
            input.value = '0000000';
            input.dispatchEvent(new InputEvent('input', { data: '0' }));

            expect(input.value.length).toBeLessThanOrEqual(8);
        });
    })
    describe('User must be notified if anything other than a 0 or 1 was entered', () => {
        it("should call alert with the correct message", () => {
            notifyUser();
            expect(global.alert).toHaveBeenCalledWith("Digite somente 0's ou 1's");
        });
        it("should call alert only once", () => {
            notifyUser();
            expect(global.alert).toHaveBeenCalledTimes(1);
        });
        it("should rejects values other than 0 and 1 and calls alert", () => {
            input.value = '2';
            input.dispatchEvent(new InputEvent('input', { data: '2' }));
            expect(global.alert).toHaveBeenCalled();
        });
        it("should keeps the last valid value after invalid input and calls alert", () => {
            input.value = '0';
            input.dispatchEvent(new InputEvent('input', { data: '0' }));

            input.value = '0a';
            input.dispatchEvent(new InputEvent('input', { data: 'a' }));

            expect(global.alert).toHaveBeenCalled();
            expect(input.value).toBe('0');
        });
    })
});