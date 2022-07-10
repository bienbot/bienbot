interface Server {
	avatar: string;
	serverName: string;
}

export interface ServerData {
	server: Server[];
}

const mockServerData: ServerData = {
	server: [
		{
			avatar: "https://picsum.photos/200/200",
			serverName: "Test Server",
		},
	],
};

export { mockServerData };
