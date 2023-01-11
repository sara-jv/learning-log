
My first every bash script, made for iterating over logs, pulling out hour long chunks and extracting desired information into a new file.

```bash
#!/bin/sh

echo -e "fetching service logs ...\n"

i=0

for i in {00..02}
do
    # get current val and next val
    h1=$(printf "%02d" $i)
    i2=$((i+1))
    h2=$(printf "%02d" $i2)

    echo "fetching service data for hour ${h1}"

    # create a directory for each hours worth of logs
    mkdir "session-${i}"

    cd session-${i}

    echo "current is " ${h1}

    echo "next is " ${h2}

    [where to get logs ...] 2022-10-21T${h1}:00:00.000Z -e 2022-10-21T${h2}:00:00.000Z [authorizing input junk] .
    #  uncompress zipped files
    zstd -d *
    #  clean up files of this type (zipped)
    rm -f *.zst
    # take all entries with that string ("Session ..."), grab 31 lines before and 9 lines after, shove into a file .
    cat * | grep "Session=134-0903795-3170824" -B 31 -A 9 > session-134-0903795-3170824-${i}-hour

    echo "removing old service data for hour ${i}"
    # clean up raw logs
    rm -f service_log* 

    cd ..

    ((i++))
done
```