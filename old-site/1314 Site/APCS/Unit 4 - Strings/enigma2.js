


           

            function encode()
            {
                var e = new Enigma();
                var input = document.getElementById("userIn").value;

                normalizeInput(document.getElementById("userIn"));

                document.getElementById("output").innerHTML= "encodes to: "+e.encodeLetterGroup(onlyCapChars(input));



            }


            normalizeInput = function(input)
            {
                var str = input.value;
                
                str = addSpaces(onlyCapChars(str));
                
                input.value = str;
                
                
            };
            
            addSpaces = function(str)
            {
                
                //return str;
                for( var i = 0; i<str.length; i++)
                {
                    if (i!==0 && (i+1) % 6 === 0)
                    {        
                        str = str.substring(0,i)+" "+str.substring(i);
                        
                    }
                }
                
                return str;
            }



            onlyCapChars = function(str)
            {
                str = str.toUpperCase();




                for (var i = 0; i < str.length; i++)
                {
                    bool:legal = true;
                    var charCode = str.charCodeAt(i);
                    if(charCode !== 32 && (charCode<65 || charCode>90))
                    {
                        //alert("Illegal Character: "+str.substring(i, i + 1)+"\nRemoving from String");
                        legal = false;
                    }
                        
                        
                    if (str.substring(i, i + 1) === " "  || !legal)
                    {
 
                        str = str.substring(0, i) + str.substring(i + 1);
                        i--;
                    }
                }
                
                return str;


            };


            function decode()
            {
                var e = new Enigma();
                var input = document.getElementById("userIn").value;
               
            

            document.getElementById("output").innerHTML= "decodes to: "+e.decodeLetterGroup(onlyCapChars(input));

            }



            var Rotor = function(key)
            {
                this.key = key;




                this.rotate = function()
                {
                    var len = key.length;



                    key = key.substring(len - 1) + key.substring(0, len - 1);

                    //alert(key);
                };


                this.getCharacterIndex = function(char)
                {
                    return key.indexOf(char);
                };

                this.getCharacterAt = function(index)
                {
                    return key.substring(index, index + 1);
                };



                this.toString = function()
                {
                    return key;
                };


                this.setStartingLetter = function(let)
                {
                    var ind = key.indexOf(let);

                    key = key.substring(ind, key.length) + key.substring(0, ind);

                };
            };


            function Enigma()
            {
                this.inner = new Rotor("GNUAHOVBIPWCJQXDKRYELSZFMT");
                this.middle = new Rotor("EJOTYCHMRWAFKPUZDINSXBGLQV");
                this.outer = new Rotor("BDFHJLNPRTVXZACEGIKMOQSUWY");



                this.encodeLetter = function(letter)
                {
                    var ind = this.inner.getCharacterIndex(letter);
                    // alert(letter+"at index " + ind)

                    var let2 = this.outer.getCharacterAt(ind);

                    var ind2 = this.middle.getCharacterIndex(let2);

                    var result = this.outer.getCharacterAt(ind2);

                    this.inner.rotate();



                    return result;

                };




                this.decodeLetter = function(letter)
                {
                    var ind = this.outer.getCharacterIndex(letter);
                    var let = this.middle.getCharacterAt(ind);

                    var ind2 = this.outer.getCharacterIndex(let);
                    var res = this.inner.getCharacterAt(ind2);

                    this.inner.rotate();
                    return res;
                };


                this.setStartingPositions = function(lets)
                {
                    this.inner.setStartingLetter(lets.substring(0, 1));
                    this.middle.setStartingLetter(lets.substring(1, 2));
                    this.outer.setStartingLetter(lets.substring(2, 3));
                };


                




                this.encodeLetterGroup = function(group)
                {
                    var encoded = "";

                    for (var i = 0; i < group.length; i++)
                    {
                        encoded += this.encodeLetter(group.substring(i, i + 1));
                        if ((i + 1) % 5 === 0)
                            encoded += " ";
                    }

                    return   encoded;
                };

                this.decodeLetterGroup = function(group)
                {
                    var decoded = "";

                    for (var i = 0; i < group.length; i++)
                    {
                        decoded += this.decodeLetter(group.substring(i, i + 1));
                        if ((i + 1) % 5 === 0)
                            decoded += " ";
                    }

                    return decoded;
                };




            }


        