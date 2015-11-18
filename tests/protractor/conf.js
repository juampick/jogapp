exports.config = {
    framework: 'jasmine',
    capabilities: {
        'browserName': 'chrome'
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['login-spec.js']
};