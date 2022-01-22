const lib = require('../lib')

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    })

    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    })

    it('should return zero number if input is zero', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    })
})

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Ali');
        expect(result).toContain('Ali');
    })
})

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(
            ['EUR', 'USD', 'AUD']
        ));
    })
})

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1);
        expect(result).toMatchObject({ id: 1, price: 10 });
    })
})

describe('registerUser', () => {
    it("should throw error if the username is falsy", () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach((a) => {
            expect(() => { lib.registerUser(a) }).toThrow();
        })
    })

    it("should return a user object if valid username is passed", () => {
        const result = lib.registerUser('ali');
        expect(result).toMatchObject({ userName: 'ali' });
        expect(result.id).toBeGreaterThan(0);
    })
})

describe('fizzBuzz', () => {
    it('should return an error if input is not a number', () => {
        expect(() => { lib.fizzBuzz('invalid') }).toThrow();
        expect(() => { lib.fizzBuzz(null) }).toThrow();
        expect(() => { lib.fizzBuzz(false) }).toThrow();
        expect(() => { lib.fizzBuzz({}) }).toThrow();

    })

    it('should return fizzbuzz if the number is devisible by 3 and 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    })

    it('should return fizz if the number is only devisible by 3', () => {
        const result = lib.fizzBuzz(9);
        expect(result).toBe('Fizz');
    })

    it('should return buzz if the number is only devisible by 5', () => {
        const result = lib.fizzBuzz(10);
        expect(result).toBe('Buzz');
    })

    it('should return input if the number is not devisible by 3 or 5', () => {
        const result = lib.fizzBuzz(1);
        expect(result).toBe(1);
    })
})