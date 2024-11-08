import requests
from bs4 import BeautifulSoup

def main():
    url = 'https://monster-sanctuary.fandom.com/wiki/Monsters'
    response = requests.get(url)
    file_path = './monsters.json'
    if response.status_code != 200:
        print(f'Failed to retrieve the page. Status code: {response.status_code}')
        exit()
    soup = BeautifulSoup(response.text, 'html.parser')
    monsters = soup.select('table.blueborder > tbody > tr > td > img[alt]')
    monsters = [line(x) for x in monsters]
    #'{"name": "' + x['alt'] + '", "src": "' + x['data-src'] + '"}'
    
    with open(file_path, 'w') as f:
        f.write('[\n')
        f.write(',\n'.join(['\t' + x for x in monsters]))
        #for monster in monsters:
        #    f.write('\t' + monster + '\n')
        f.write('\n]')
        print(f'Wrote {len(monsters)} lines')

def line(monster):
    name = monster["alt"]
    src = monster["data-src"]
    return f'{{"name": "{name}", "src": "{src}"}}'

if __name__ == '__main__':
    main()
