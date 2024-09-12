
const AsyncWrapper = (fn) => {

    async function run(req,res,next){
        try {
            await fn(req,res,next)
        } catch (error) {
            next(error)
        }
    }
    return run
}

module.exports = AsyncWrapper