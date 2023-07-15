import httpService from "./http.service"

const todosEndPoint = "todos/"

const todosService = {
    fetch: async () => {
        const { data } = await httpService.get(todosEndPoint, {
            params: {
                _page: 1,
                _limit: 10
            }
        });
        return data;
    },
    create: async () => {
        const { data } = await httpService.post(todosEndPoint, {
            title: "foo",
            body: "bar",
            userId: 2522,
            completed: false
        })
        console.log(data)
        return data;
    }
};

export default todosService;