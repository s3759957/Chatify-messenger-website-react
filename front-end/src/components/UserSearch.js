import { AutoComplete, Input } from "antd";
import { useState, useEffect, useRef } from "react";

const UserSearch = (props) => {
  const didMountRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState([]);

  const searchResult = (query) => {
    const foundUsers = users.filter(
      (user) =>
        JSON.stringify(user).toLowerCase().indexOf(query.toLowerCase()) !==
          -1 && user.username !== props.username
    );

    return foundUsers.map((user) => {
      return {
        value: user.username,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* <span>
              <Avatar avatarUrl={user.avatar} username={user.username} />
            </span> */}
            <span>
              <div>
                {user.first_name} {user.last_name}
              </div>
              <div>{user.username}</div>
            </span>
          </div>
        ),
      };
    });
  };
  const handleSearch = (query) => {
    setOptions(query ? searchResult(query) : []);
  };

  const onSelect = (value) => {
    setLoading(true);

    const headers = {
      "User-Name": "props.username",
      "User-Secret": "props.secret",
    };
    const data = {
      usernames: ["props.username", "value"],
    };
    // axios
    //   .put("https://api.chatengine.io/chats/", data, { headers })
    //   .then((r) => {
    //     props.onSelect(r.data.id);
    //     setLoading(false);
    //     setQuery("");
    //   })
    //   .catch(() => setLoading(false));
  };

  return (
    <div>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        className="ce-chat-form-autocomplete"
        options={options}
        // onSelect={onSelect}
        // onSearch={handleSearch}
        value={query}
      >
        <Input.Search
          size="large"
          placeholder="Chats"
          enterButton
          loading={loading}
          //   onChange={(e) => setQuery(e.target.value)}
        />
      </AutoComplete>
    </div>
  );
};

export default UserSearch;
