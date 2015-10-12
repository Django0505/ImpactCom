var reportDataCapturer = require('../routes/reportDataCapturer');

test("a basic test example", function () {

    var expected = {
    	rough : "cough",
    	number : 45,
    	desc : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, nemo itaque ducimus quo at laboriosam amet doloribus sit, vitae veniam quibusdam distinctio voluptatum sint inventore quaerat ex porro? Nesciunt, impedit."
    }

    reportDataCapturer.save_data(expected, "./tests/test_save_data.json")

    var actual = reportDataCapturer.read_data('./tests/test_save_data.json');

    deepEqual(actual, expected, "We expect value to be hello");
});

