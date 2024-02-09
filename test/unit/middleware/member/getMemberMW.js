var expect = require('chai').expect;
var getMemberMW = require('../../../../middlewares/members/getMemberMW');


describe('getMemberMW middleware ', function() {

    it('should set res.locals.member to testmember', function(done) {
        const mw = getMemberMW({
            memberModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: "2" })
                    cb(undefined, "testmember");
                }
            }
        });
        const resMock = {
            locals: {
                member: {
                    _id: "2"
                }
            }
        }
        mw({
                params: {
                    memberID: "2"
                }
            },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({
                    member: 'testmember'
                });
                done();
            });
    });
    it('should call next with error', function(done) {
        const mw = getMemberMW({
            memberModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: "1" })
                    cb("hiba", null);
                }
            }
        });
        const resMock = {
            locals: {
                member: {
                    _id: "2"
                }
            }
        }
        mw({
                params: {
                    memberID: "1"
                }
            },
            resMock,
            (err) => {
                expect(err).to.be.eql("hiba");
                done();
            });
    });
});