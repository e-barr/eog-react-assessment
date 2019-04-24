import "isomorphic-fetch";

const findDroneLocation = async () => {
    const response = await fetch('https://react-assessment-api.herokuapp.com/api/drone');

    if (!response.ok) {
        return { error: { code: response.status } };
    }

    let resp = await response.json()
    let data = resp.data
    return { data }
}

export default findDroneLocation;