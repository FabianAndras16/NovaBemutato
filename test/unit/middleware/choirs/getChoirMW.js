var expect = require('chai').expect;
var getChoirMW = require('../../../../middlewares/choirs/getChoirMW');
const getMemberMW = require("../../../../middlewares/members/getMemberMW");

describe('getChoirMW middleware ', function() {
    it('should set res.locals.choir to testchoir', function(done) {
        const mw = getChoirMW({
            choirModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: 74 })
                    cb(undefined, null);
                }
            },
            memberModel: {
                countDocuments: (p2, cb2) => {
                    expect(p2).to.be.eql({ _choirMember: 10 })
                    cb2(undefined, "testcount");
                }
            }
        });
        const resMock = {
            locals: {
                choir: "testchoir"
            }
        }
        mw({
                params: {
                    choirID: 74
                }
            },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({
                    choir: 'testchoir'
                });
                done();
            }).catch(done);
    });
    it('should call next with error', function(done) {
        const mw = getChoirMW({
            choirModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: 77 })
                    cb("hiba", null);
                }
            },
            memberModel: {
                countDocuments: (p2, cb2) => {
                    expect(p2).to.be.eql({ _choirMember: 10 })
                    cb2(undefined, "testcount");
                }
            }
        });
        const resMock = {
            locals: {

            }
        }
        mw({
                params: {
                    choirID: 77
                }
            },
            resMock,
            (err) => {
                expect(err).to.be.eql("hiba");
                expect(resMock.locals).to.be.eql({});
                done();
            }).catch(done);
    });
});