JSON = (loadfile "JSON.lua")() -- http://regex.info/blog/lua/json


--local lua_value = JSON:decode(raw_json_text) -- decode example


--local raw_json_text    = JSON:encode(lua_table_or_value)        -- encode example
--local pretty_json_text = JSON:encode_pretty(lua_table_or_value) -- "pretty printed" version

quizList = {path = "assets/quiz",
	    list = {{name = "AutoGen", content = {}}}}

function scandir(directory) -- https://coronalabs.com/blog/2014/09/02/tutorial-printing-table-contents/
   local i, t, popen = 0, {}, io.popen
   for filename in popen('ls -a "'..directory..'"'):lines() do
      i = i + 1
      t[i] = filename
   end

   table.remove(t, 1)
   table.remove(t, 1)

   return t
end

function table_print (tt, indent, done) -- http://lua-users.org/wiki/TableSerialization
   done = done or {}
   indent = indent or 0
   if type(tt) == "table" then
      for key, value in pairs (tt) do
	 io.write(string.rep (" ", indent)) -- indent it
	 if type (value) == "table" and not done [value] then
	    done [value] = true
	    io.write(string.format("[%s] => table\n", tostring (key)));
	    io.write(string.rep (" ", indent+4)) -- indent it
	    io.write("(\n");
	    table_print (value, indent + 7, done)
	    io.write(string.rep (" ", indent+4)) -- indent it
	    io.write(")\n");
	 else
	    io.write(string.format("[%s] => %s\n",
				   tostring (key), tostring(value)))
	 end
      end
   else
      io.write(tt .. "\n")
   end
end

-- table_print(quizList)

-- print()
-- print(quizList.list.name)
-- print()

files = scandir("../assets/quiz")

for k,v in pairs(files) do
   file = io.open("../assets/quiz/" .. v, "r")

   if (file == nil) then
      print("Error opening the file")
   end

   my_json = file:read("*all")

   if my_json == "" then
      print("Empty file")
   end

   parse = JSON:decode(my_json)

   do
      local jname = string.gsub(parse["theme"], "\n", "")
      local jurl = v
      local jcontent = {name = jname, url = jurl}
      table.insert(quizList.list[1].content, jcontent)
      --   print(title) 
   end
end





print(JSON:encode_pretty(quizList))

-- table_print(parse)

-- table_print({tag='Sum', 1, {tag='Product', 2, 3}, lines={10,11}})

--[[
jzon = {path = "assets/quiz/",
	list = {{name = "La categoy 1",
		 content = {{name = "quiz name 1",
			     url = "quiz.json"},
		    {name = "quiz name 2",
		     url = "quiz.json"}
		 }
		},
	   {name = "Une categoy 2",
	    content = {{name = "quiz name 1",
			url = "quiz.json"},
	       {name = "quiz name 2",
		url = "quiz.json"},
	       {name = "quiz name 3",
		url = "quiz.json"},
	       {name = "quiz name 4",
		url = "quiz.json"}
	    }
	   },
	   {name = "Toto",
	    content = {{name = "ariettite",
			url = "arietty.json"},
	       {name = "quiz name blabbla",
		url = "arrietty4.json"},
	       {name = "quiz name 3",
		url = "quiz.json"}
	    },
	   }
	}
}
]]--

--table_print(jzon)

