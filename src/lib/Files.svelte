<script>
  let files = [];

  const handleChooseFolder = async () => {
    try {
      const folderHandle = await window.showDirectoryPicker();
      const filesInFolder = await getFilesInFolder(folderHandle);
      files = filesInFolder.map((file) => file.name);
    } catch (error) {
      console.error('Error selecting folder:', error);
    }
  };

  const getFilesInFolder = async (folderHandle) => {
    const files = [];
    for await (const entry of folderHandle.values()) {
      if (entry.kind === 'file') {
        files.push(entry);
      } else if (entry.kind === 'directory') {
        const nestedFiles = await getFilesInFolder(entry);
        files.push(...nestedFiles);
      }
    }
    return files;
  };
</script>

<main>
    <button on:click={handleChooseFolder}>Choose Folder</button>
    {#if files.length > 0}
        <ul>
            {#each files as file}
                <li>{JSON.stringify(file)}</li>
            {/each}
        </ul>
    {/if}
</main>

<style>
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }
</style>
