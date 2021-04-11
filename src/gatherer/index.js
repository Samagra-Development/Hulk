import TestGatherer from "./TestGatherer";

const config = {
    "test": new TestGatherer(),
};



export default function getProcessor(name) {
    if (!config[name] || !config[name].processTask) {
        throw `No processor defined for ${name} type of service`;
    }
    return config[name];
}