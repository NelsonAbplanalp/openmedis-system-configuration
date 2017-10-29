<template>
    <div id="om-list-header">
        <div id="om-list-header-left" class="om-list-header-block">
            <span class="om-title"> {{title}} </span>
            <span id="om-info-icon" class="glyphicon glyphicon-info-sign"></span>
        </div>
        <div id="om-list-header-right" class="om-list-header-block">
            <span id="om-filter-icon" class="glyphicon glyphicon-filter"></span>
            <span id="om-plus-icon" class="glyphicon glyphicon-plus"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ListHeader',
        props: ['title']
    }
</script>
