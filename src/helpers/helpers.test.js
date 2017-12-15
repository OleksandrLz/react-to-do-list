import { getFullApiUrl } from './';

const GROUP_ID = 'hk0p2r2vfp';
const api = 'https://lab.lectrum.io/react/api';

describe('helpers: ', () => {
    test('getFullApiUrl function should be a function', () => {
        expect(typeof getFullApiUrl).toBe('function');
    });

    test('getFullApiUrl function should throw an error if wrong non-string arguments were passed', () => {
        function getFullNameWithError () {
            getFullApiUrl(null, 1);
        }

        expect(getFullNameWithError).toThrowError(
            `'api' and 'GROUP_ID' arguments passed should be a string!`
        );
    });

    test('getFullApiUrl function should return fullName string separated by one space after successful execution', () => {
        expect(getFullApiUrl(api, GROUP_ID)).toBe(`${api}/${GROUP_ID}`);
    });
});
